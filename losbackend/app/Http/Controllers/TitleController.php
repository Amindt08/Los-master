<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TitleController extends Controller
{

    public function tambahTitle(Request $request)
    {
        $title = new Title;
        $kodeTerakhir = Title::max('Kode');
        $nomorBaru = $kodeTerakhir ? $kodeTerakhir +1 : 1;
        $title->Kode = $nomorBaru;
        $title->Keterangan = $request->input('Keterangan');
        $title->save();

        return response()->json($title);
    }

    public function getTitle()
    {
        $title = Title::all();
        return response()->json($title);
    }

    public function getTitleById($id)
{
    $title = Title::where('Kode', $id)->first();

    if (!$title) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($title);
}

    public function updateTitle(Request $request, string $id)
    {
        $title = Title::where('Kode', $id)->firstOrFail();
        $title->update($request->all());
        return response()->json($title);
    }

    public function deleteTitle($id)
    {
        $title = Title::where('Kode', $id)->first();
        if (!$title) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $title->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
