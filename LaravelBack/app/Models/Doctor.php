<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Doctor_appointment;
use App\Models\Department;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'departement_id',
        'phone',

    ];

    public function doctor_appointments()
    {
        return $this->hasMany(Doctor_appointment::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'departement_id','id');
    }

}
