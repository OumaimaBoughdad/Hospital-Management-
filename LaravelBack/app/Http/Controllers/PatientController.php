<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Patient;
use Dotenv\Store\File\Paths;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required|string',
        ]);

        return Patient::create($validatedData);
    }

    public function update(Request $request, Patient $patient)
    {
        $validatedData = $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email|unique:patients,email,' . $patient->id,
            'phone' => 'required|string',
        ]);

        $patient->update($validatedData);

        return $patient;
    }

    //the function to update patient data 
    public function updatePatient(Request $request, $id)
    {
        $patient = Patient::find($id);
        $patient->full_name = $request->full_name;
        $patient->email = $request->email;
        $patient->phone = $request->phone;
        $patient->save();

        $message = "Patient was updated successfully";
        Return response()->json($message,201);
    }

    public function deleteP($id)
    {
        $patient = Patient::find($id);
        $patient->delete();

        $message = "patient deleted successfully";
        return response()->json($message,200);
    }

    public function editPatient($id)
    {
        $patient= Patient::find($id);
        return response()->json($patient);
    }

    public function patientDetails($id)
    {
        $patient = Patient::find($id);
        return response()->json($patient);
    }
}

