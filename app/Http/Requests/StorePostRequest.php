<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    public function attributes()
    {
        return [
          'category_id' => 'category',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'O campo Titulo é obrigatório',
            'content.required' => 'O campo Conteudo é obrigatório',
            'category_id.required' => 'A categoria é obrigatória',
            'category_id.exists' => 'A categoria selecionada não existe',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
