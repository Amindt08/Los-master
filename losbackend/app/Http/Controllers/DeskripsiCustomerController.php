<?php

namespace App\Http\Controllers;

use App\Models\DeskripsiCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class DeskripsiCustomerController extends Controller
{

    public function tambahDeskripsiCustomer(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $dekripsi = new DeskripsiCustomer;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = DeskripsiCustomer::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $dekripsi->Kode = $nomorBaru;
            
            $dekripsi->Keterangan = $request->input('Keterangan');
            $dekripsi->save();

            return response()->json($dekripsi);
        });
    }

    public function getDeskripsiCustomer()
    {
        $deskripsi = DeskripsiCustomer::all();
        return response()->json($deskripsi);
    }

    public function getDeskripsiCustomerById($id)
    {
        $deskripsi = DeskripsiCustomer::where('Kode', $id)->first();

        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($deskripsi);
    }

    public function updateDeskripsiCustomer(Request $request, string $id)
    {
        $deskripsi = DeskripsiCustomer::where('Kode', $id)->firstOrFail();
        $deskripsi->update($request->all());
        return response()->json($deskripsi);
    }

    public function deleteDeskripsiCustomer($id)
    {
        $deskripsi = DeskripsiCustomer::where('Kode', $id)->first();
        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $deskripsi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
