<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {   
        return [
            'email' => 'required|max:255|email',
            'password' => 'required|max:255',
            // 'body' => 'required',
            // 'email' => ['required|email|max:255'],
            // 'password' => ['required|max:255'],
            // 'device_name' => ['required|max:255'],    
        ];
    }

    public function messages(){

        return[
         
                'email.required' => 'A email is required',
                'password.required' => 'A password is required',
            
        ];
    }
}
