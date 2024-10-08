<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = ['intitule'];

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }
    use HasFactory;
}
