<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Doctor;

class DoctorApiController extends Controller
{
    
    public function doctorList()
    {
        $doctors = Doctor::with('department')->get(); // Ensure 'department' is the correct relationship method
        return response()->json($doctors);
    }
    
    public function doctorDetails($id)
    {
        $doctor = Doctor::find($id);
        return response()->json($doctor);
    }
    public function createDoctor(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'departement_id' => 'required|exists:departments,id', // Make sure "departments" is the correct table name
            'phone' => 'required|string|max:15',
        ]);
    
        // Create new doctor
        $doctor = new Doctor();

        $doctor->name = $request->name;
        $doctor->departement_id = $request->departement_id; // Assuming "departement_id" is the foreign key column
        $doctor->phone = $request->phone;
        $doctor->save();
        
        return response()->json([
            'message' => 'Doctor added successfully',
            'doctor' => $doctor,
        ], 201);
    }
    
    

    public function editDoctor($id)
    {
        $doctor = Doctor::find($id);
        return response()->json($doctor);
    }
    public function updateDoctor(Request $request, $id)
    {
        $doctor = Doctor::find($id);
        $doctor->name = $request->name;
        $doctor->phone = $request->phone;
        $doctor->save();

        $message = "Doctor updated successfully";
        Return response()->json($message,201);
    }
    public function deleteDoctor($id)
    {
        $doctor = Doctor::find($id);
        $doctor->delete();

        $message = "Doctor deleted successfully";
        return response()->json($message,200);
    }

}
