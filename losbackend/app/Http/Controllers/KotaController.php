<?php

namespace App\Http\Controllers;

use App\Models\RefKota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KotaController extends Controller
{

    public function tambahKota(Request $request)
    {
        $kota = new RefKota;
        $kodeTerakhir = RefKota::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 3) + 1 : 1;
        Log::info($request->input('provinsi_id'));
        $kota->Kode = sprintf('WKB%07d', $nomorBaru);
        $kota->Keterangan = $request->input('Keterangan');
        $kota->provinsi_id = $request->input('provinsi_id'); //tambah id provinsi
        $kota->save();

        return response()->json($kota);
    }

    public function getKota()
    {
        $kota = RefKota::all();
        return response()->json($kota);
    }

    public function updateKota(Request $request, string $id)
    {
        $kota = RefKota::where('Kode', $id)->firstOrFail();
        $kota->update($request->all());
        return response()->json($kota);
    }

    public function deleteKota($id)
    {
        $kota = RefKota::where('Kode', $id)->first();
        if (!$kota) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $kota->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
