<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Doctor_appointment;
use App\Models\Doctor;
use Carbon\Carbon; // Add this line

class AppointmentApiController extends Controller
{
    
    public function appointmentList()
    {
        $appointments = Doctor_appointment::with('doctor')->get();
        return response()->json($appointments);
    }
    public function createAppointment(Request $request, $id)
    {
        $request->validate([
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:15',
            'appointment_date' => 'required|date',
        ]);
    
        // Count existing appointments for the doctor on the given date
        $appointmentAmount = Doctor_appointment::where('doctor_id', $id)
            ->where('appointment_date', $request->appointment_date)
            ->count();
    
        // Determine the next serial number
        $serial_number = $appointmentAmount > 0
            ? Doctor_appointment::where('doctor_id', $id)
                ->where('appointment_date', $request->appointment_date)
                ->max('serial_number')
            : 0;
    
        // Create new appointment
        $appointment = new Doctor_appointment();
        $appointment->doctor_id = $id;
        $appointment->patient_name = $request->patient_name;
        $appointment->patient_phone = $request->patient_phone;
        $appointment->serial_number = $serial_number + 1;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->appointment_time = $request->appointment_time;
        $appointment->status = "Appointed";
        $appointment->save();
    
        return response()->json([
            'message' => 'Appointment added successfully',
            'serialNumber' => $appointment->serial_number,
        ], 201);
    }
    
    public function cancelAppointment($id)
    {
        $appointment = Doctor_appointment::find($id);
        $appointment->status="Cancelled";
        $appointment->save();

        $message = "Appointment cancelled successfully";
        return response()->json($message,200);
    }
    public function appointmentSearch(Request $request)
    {
        if($request->date==NULL)
        {
            $appointments = Doctor_appointment::with('doctor')->where('patient_name','like','%'.$request->name.'%')->get();
        }
        else if($request->name==NULL)
        {
            $appointments = Doctor_appointment::with('doctor')->where('appointment_date',$request->date)->get();

        }
        else if($request->name!=NULL && $request->date!=NULL)
        {
            $appointments = Doctor_appointment::with('doctor')->where('patient_name','like','%'.$request->name.'%')->where('appointment_date',$request->date)->get();
        }
        else
        {
            $appointments = Doctor_appointment::with('doctor')->get();
        }

        return response()->json($appointments,200);
        
    }

    //update state function

    public function updateState()
    {
        // Get current date and time
        $now = Carbon::now();

        // Find all appointments where the date and time have passed and the status is still "Appointed"
        $appointments = Doctor_appointment::where('status', 'Appointed')
            ->where(function ($query) use ($now) {
                $query->where('appointment_date', '<', $now->toDateString())
                      ->orWhere(function ($subQuery) use ($now) {
                          $subQuery->where('appointment_date', '=', $now->toDateString())
                                   ->where('appointment_time', '<', $now->toTimeString());
                      });
            })
            ->get();

        // Update the status of these appointments to "Not show up"
        foreach ($appointments as $appointment) {
            $appointment->status = 'Not shown up';
            $appointment->save();
        }

        return response()->json([
            'message' => 'Appointment statuses updated successfully',
            'updated_appointments' => $appointments,
        ], 200);
    }
    //function to update the status to completed 
    public function completeAppointment($id)
    {
        $appointment = Doctor_appointment::find($id);

        if ($appointment && $appointment->status == 'Appointed') {
            $appointment->status = 'Completed';
            $appointment->save();

            return response()->json([
                'message' => 'Appointment marked as completed successfully',
                'appointment' => $appointment,
            ], 200);
        }

        return response()->json([
            'message' => 'Appointment not found or already completed',
        ], 404);
    }  
    //a function to get only the completed appointments 
    public function getCompletedAppointments()
    {
        $completedAppointments = Doctor_appointment::where('status', 'Completed')->get();

        return response()->json([
            'message' => 'Completed appointments fetched successfully',
            'appointments' => $completedAppointments,
        ], 200);
    }
    //remove an appointement 
    public function removeAppointment($id)
    {
        $appointment = Doctor_appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment removed successfully'], 200);
    }

}
