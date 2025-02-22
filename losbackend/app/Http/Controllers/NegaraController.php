<?php

namespace App\Http\Controllers;

use App\Models\RefNegara;
use Illuminate\Http\Request;

class NegaraController extends Controller
{

    public function tambahNegara(Request $request)
    {
        $negara = new REfNegara;
        $kodeTerakhir = RefNegara::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $negara->Kode = sprintf('WN%07d', $nomorBaru);
        $negara->Keterangan = $request->input('Keterangan');
        $negara->save();

        return response()->json($negara);
    }

    public function getNegara()
    {
        $negara = RefNegara::all();
        return response()->json($negara);
    }

    public function updateNegara(Request $request, string $id)
    {
        $negara = RefNegara::where('Kode', $id)->firstOrFail();
        $negara->update($request->all());
        return response()->json($negara);
    }

    public function deleteNegara($id)
    {
        $negara = RefNegara::where('Kode', $id)->first();
        if (!$negara) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $negara->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
