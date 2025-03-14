<?php

namespace App\Http\Controllers;

use App\Models\TitleCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TitleCustomerController extends Controller
{

    public function tambahTitleCustomer(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $title = new TitleCustomer;
            
            DB::table('judul_customer')->lockForUpdate()->get();

            $kodeTerakhir = TitleCustomer::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $title->Kode = $nomorBaru;
            
            $title->Keterangan = $request->input('Keterangan');
            $title->save();

            return response()->json($title);
        });
    }

    public function getTitleCustomer()
    {
        $title = TitleCustomer::all();
        return response()->json($title);
    }

    public function getTitleCustomerById($id)
{
    $title = TitleCustomer::where('Kode', $id)->first();

    if (!$title) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($title);
}

    public function updateTitleCustomer(Request $request, string $id)
    {
        $title = TitleCustomer::where('Kode', $id)->firstOrFail();
        $title->update($request->all());
        return response()->json($title);
    }

    public function deleteTitleCustomer($id)
    {
        $title = TitleCustomer::where('Kode', $id)->first();
        if (!$title) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $title->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
