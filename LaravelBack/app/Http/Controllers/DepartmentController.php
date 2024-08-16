<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        return Department::all();
    }

    public function store(Request $request)
    {
        $department = Department::create($request->all());
        return response()->json($department, 201);
    }

    public function show($id)
    {
        return Department::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);
        $department->update($request->all());
        return response()->json($department, 200);
    }

    public function destroy($id)
    {
        Department::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

