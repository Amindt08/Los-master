<?php

namespace App\Http\Controllers;

use App\Models\DeskripsiProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class DeskripsiProductController extends Controller
{

    public function tambahDeskripsiProduct(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $dekripsi = new DeskripsiProduct;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = DeskripsiProduct::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $dekripsi->Kode = $nomorBaru;
            
            $dekripsi->Keterangan = $request->input('Keterangan');
            $dekripsi->save();

            return response()->json($dekripsi);
        });
    }

    public function getDeskripsiProduct()
    {
        $deskripsi = DeskripsiProduct::all();
        return response()->json($deskripsi);
    }

    public function getDeskripsiProductById($id)
    {
        $deskripsi = DeskripsiProduct::where('Kode', $id)->first();

        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($deskripsi);
    }

    public function updateDeskripsiProduct(Request $request, string $id)
    {
        $deskripsi = DeskripsiProduct::where('Kode', $id)->firstOrFail();
        $deskripsi->update($request->all());
        return response()->json($deskripsi);
    }

    public function deleteDeskripsiProduct($id)
    {
        $deskripsi = DeskripsiProduct::where('Kode', $id)->first();
        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $deskripsi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
