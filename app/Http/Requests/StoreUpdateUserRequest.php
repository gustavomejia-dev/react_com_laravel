<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateUserRequest extends FormRequest
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
    {   $rules = [
        'tenant_id' => 'required',
        'name' => 'required|min:3|max:255',
        'email' => [
            'required',
            'email',
            'max:255',
            'unique:users'
        ],
        'password' => [
            'required',
            'min:4',
            'max:100',
        ],
        
    ];
    if($this->method() === 'PATCH'){
        $rules['password'] = [
            'nullable',
            'min:4',
            'max:100',
        ];

        $rules['email'] = [
            'required',
            'email',
            'max:255',
            "unique:users,email,{$this->id}, id",/* SE FOR ATUALIZAR ELE DEIXA ATUALIZA 
            SEM MUDAR O EMAIL, JÁ QUE É UNICO, MAS SE FOR MUDAR ELE VERIFICA SE JÁ EXISTE NO BANCO */
            /*Rule::unique('users')->ignore($this->id) OUTRA MANEIRA DE FAZER*/
        
        ];
    }
        return $rules;
    }
}
