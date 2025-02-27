<?php

namespace App\Http\Controllers;

use App\Models\RefProvinsi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProvinsiController extends Controller
{

    public function tambahProvinsi(Request $request)
    {
        $provinsi = new REfProvinsi;
        $kodeTerakhir = RefProvinsi::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $provinsi->Kode = sprintf('WP%07d', $nomorBaru);
        // $provinsi->Kode = $request->input('Kode');
        $provinsi->Keterangan = $request->input('Keterangan');
        $provinsi->negara_id = $request->input('negara_id'); //tambah id negara
        Log::info($request->input('negara_id'));
        $provinsi->save();

        return response()->json($provinsi);
    }

    public function getProvinsi()
    {
        $provinsi = RefProvinsi::all();
        return response()->json($provinsi);
    }

    public function updateProvinsi(Request $request, string $id)
    {
        $provinsi = RefProvinsi::where('Kode', $id)->firstOrFail();
        $provinsi->update($request->all());
        return response()->json($provinsi);
    }

    public function deleteProvinsi($id)
    {
        $provinsi = RefProvinsi::where('Kode', $id)->first();
        if (!$provinsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $provinsi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
