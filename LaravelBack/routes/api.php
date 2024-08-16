<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DoctorApiController;
use App\Http\Controllers\AppointmentApiController;
use App\Http\Controllers\HomeApiController;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\PatientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/doctor-list', 'App\Http\Controllers\DoctorApiController@doctorList');
Route::post('/add-doctor/process', 'App\Http\Controllers\DoctorApiController@createDoctor');
Route::get('/doctor/{id}', 'App\Http\Controllers\DoctorApiController@doctorDetails');
Route::get('/doctor-edit/{id}', 'App\Http\Controllers\DoctorApiController@editDoctor');
Route::patch('/doctor-update/{id}', 'App\Http\Controllers\DoctorApiController@updateDoctor');
Route::delete('/doctor-delete/{id}', 'App\Http\Controllers\DoctorApiController@deleteDoctor');

Route::get('/information', 'App\Http\Controllers\HomeApiController@information');

Route::get('/appointment-list', 'App\Http\Controllers\AppointmentApiController@appointmentList');
Route::post('/appointment-search', 'App\Http\Controllers\AppointmentApiController@appointmentSearch');
Route::post('/appointment-add/process/{id}', 'App\Http\Controllers\AppointmentApiController@createAppointment');
Route::patch('/appointment-cancel/{id}', 'App\Http\Controllers\AppointmentApiController@cancelAppointment');

Route::get('/doctors/free-time/{date}', 'App\Http\Controllers\SlotController@freeTime');

Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/register', 'App\Http\Controllers\AuthController@register');

Route::group([

    'middleware' => 'api',

], function ($router) {


    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('/refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('/me', 'App\Http\Controllers\AuthController@me');
});


//patient management crud

Route::get('/patients', 'App\Http\Controllers\PatientController@index');
Route::post('/addpatient', 'App\Http\Controllers\PatientController@store');
Route::patch('/patient-update/{id}', 'App\Http\Controllers\PatientController@updatePatient');
Route::delete('/delete_patient/{id}', 'App\Http\Controllers\PatientController@deleteP');
Route::get('/patient-edit/{id}', 'App\Http\Controllers\PatientController@editPatient');
Route::get('/patient/{id}', 'App\Http\Controllers\PatientController@patientDetails');

//departmenet apis 
Route::get('/departement', 'App\Http\Controllers\DepartmentController@index');

//add a departement index
Route::post('/adddepar', 'App\Http\Controllers\DepartmentController@store');
Route::get('/departments', 'App\Http\Controllers\DepartmentController@index');

//change appointmenet state updateState()
Route::patch('/appointments/update-state', [AppointmentApiController::class, 'updateState']);
//marque the appointment as done 
Route::patch('/appointment-complete/{id}', [AppointmentApiController::class, 'completeAppointment']);
//get only the completed appointmeents 
Route::get('/appointments/completed', [AppointmentApiController::class, 'getCompletedAppointments']);
Route::delete('/appointment-remove/{id}', [AppointmentApiController::class, 'removeAppointment']);





