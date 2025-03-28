export const api_url = 'http://127.0.0.1:8000/api';
// const api_url ='https://e5b1-125-166-8-202.ngrok-free.app/api';

export const API_ENDPOINTS = {
  //user
  SIDEBAR: (userId: string) => `${api_url}/user/${userId}/sidebars`,
  REGISTER: `${api_url}/register`,
  LOGIN: `${api_url}/login`,
  UPDATE_USER: (id: string) => `${api_url}/updateuserbyid/${id}`,
  VERIFY_USER: `${api_url}/verify-user`,

  //sidebar
  SYNC_SIDEBAR: `${api_url}/sync-user-sidebars`,
  GETSIDEBAR: `${api_url}/getallusersidebar`,
  UPDATE_STATUS_SIDEBAR: `${api_url}/sidebars/update-status`,

  //pemohon
  PEMOHON: `${api_url}/pemohon`,
  GETPEMOHONBYCIF: (cif: string) => `${api_url}/getpemohonbycif/${cif}`,
  UPDATEPEMOHONBYID: (cif: string) => `${api_url}/updatepemohonbyid/${cif}`,
  DELETEPEMOHONBYID: (Cif: string) => `${api_url}/deletepemohonbyid/${Cif}`,
  GETALLPEMOHON: `${api_url}/getallpemohon`,
  GETNASABAH: `${api_url}/getregisternasabah`,
  GETNASABAHID: (value: string) => `${api_url}/pemohon/${value}`,
  //produk/pengajuan
  GETALLPRODUK: `${api_url}/getallproduk`,
  GETPRODUKBYCIF: (cif: string) => `${api_url}/getprodukbycif/${cif}`,
  GETPRODUKBYID: (no_pengajuan: string) => `${api_url}/getprodukbyid/${no_pengajuan}`,
  DELETEPRODUKBYID: (NomorRekening: string) => `${api_url}/deleteprodukbyid/${NomorRekening}`,
  GETLASTPENGAJUAN: `${api_url}/getlastpengajuan`,
  ADDPRODUK: `${api_url}/produk`,
  UPDATEPRODUKBYID: (no_pengajuan: string) => `${api_url}/updatepengajuanbyid/${no_pengajuan}`,
  UPDATESTATUSPENGAJUANBYID: (no_pengajuan: string) => `${api_url}/updatestatuspengajuanbyid/${no_pengajuan}`,


  //jaminan
  ADDJAMINAN: `${api_url}/jaminan`,
  // GETALLJAMINAN: `${api_url}/getalljaminan`,
  // GETJAMINANBYID: (id: string) => `${api_url}/getjaminanbyid/${id}`,
  UPDATEJAMINANBYID: (no_pengajuan: string) => `${api_url}/updatejaminanbyid/${no_pengajuan}`,
  GETJAMINANBYNOPENGAJUAN: (no_pengajuan: string) => `${api_url}/getjaminanbyid/${no_pengajuan}`,
  DELETEJAMINANBYID: (no_pengajuan: string, jenisAgunan: string) => `${api_url}/deletejaminanbyid/${no_pengajuan}/${jenisAgunan}`,

  //finansial
  FINANCIAL: `${api_url}/finansial`,
  GETALLFINANCIAL: `${api_url}/getallfinansial`,
  GETFINANCIALBYNOPENGAJUAN: (no_pengajuan: string) => `${api_url}/getfinansialbynopengajuan/${no_pengajuan}`,
  GETFINANCIALBYCIF: (cif: string) => `${api_url}/getfinansialbycif/${cif}`,
  UPDATEFINANCIALBYID: (no_pengajuan: string) => `${api_url}/updatefinansialbyid/${no_pengajuan}`,

  //survey
  GETSURVEY: `${api_url}/getSurvey`,
  ADDSURVEY: `${api_url}/addSurvey`,
  GETALLSURVEY: `${api_url}/getallsurvey`,
  GETSURVEYBYNOPENGAJUAN: (no_pengajuan: string) => `${api_url}/getsurveybynopengajuan/${no_pengajuan}`,
  UPDATESURVEYBYID: (no_pengajuan: string) => `${api_url}/updatesurveybyid/${no_pengajuan}`,

  //aspek
  ASPEKFORM: `${api_url}/aspek`,
  GETALLASPEK: `${api_url}/getallaspek`,
  GETASPEKBYNOPENGAJUAN: (no_pengajuan: string) => `${api_url}/getaspekbynopengajuan/${no_pengajuan}`,
  UPDATEASPEKBYID: (no_pengajuan: string) => `${api_url}/updateaspekbyid/${no_pengajuan}`,

  //limac
  LIMAC: `${api_url}/limac`,
  GETALLLIMAC: `${api_url}/getalllimac`,
  GETLIMACBYNOPENGAJUAN: (no_pengajuan: string) => `${api_url}/getlimacbynopengajuan/${no_pengajuan}`,
  UPDATELIMACBYID: (no_pengajuan: string) => `${api_url}/updatelimacbyid/${no_pengajuan}`,


  //pengajuan kredit
  GETGOLONGANKREDIT: `${api_url}/getgolongankredit`,

  //Master Aspek
  TAMBAHTITLEASPEK: `${api_url}/tambahTitleAspek`,
  GETTITLEASPEK: `${api_url}/gettitleaspek`,
  UPDATETITLEASPEKBYID: (Kode: string) => `${api_url}/updatetitleaspekbyid/${Kode}`,
  DELETETITLEASPEKBYID: (Kode: string) => `${api_url}/deletetitleaspekbyid/${Kode}`,

  //Master Jaminan
  TAMBAHJENISAGUNAN: `${api_url}/tambahjenisagunan`,
  GETJENISAGUNAN: `${api_url}/getjenisagunan`,
  UPDATEJENISAGUNANBYID: (Kode: string) => `${api_url}/updatejenisagunanbyid/${Kode}`,
  DELETEJENISAGUNANBYID: (Kode: string) => `${api_url}/deletejenisagunanbyid/${Kode}`,
  TAMBAHHAKMILIK: `${api_url}/tambahHakMilik`,
  GETHAKMILIK: `${api_url}/getHakMilik`,
  UPDATEHAKMILIKBYID: (Kode: string) => `${api_url}/updateHakMilikbyid/${Kode}`,
  DELETEHAKMILIKBYID: (Kode: string) => `${api_url}/deleteHakMilikbyid/${Kode}`,
  TAMBAHTIPE: `${api_url}/tambahTipe`,
  GETTIPE: `${api_url}/getTipe`,
  UPDATETIPEBYID: (Kode: string) => `${api_url}/updateTipebyid/${Kode}`,
  DELETETIPEBYID: (Kode: string) => `${api_url}/deleteTipebyid/${Kode}`,
  TAMBAHJENISPENGIKATAN: `${api_url}/tambahJenisPengikatan`,
  GETJENISPENGIKATAN: `${api_url}/getJenisPengikatan`,
  UPDATEJENISPENGIKATANBYID: (Kode: string) => `${api_url}/updateJenisPengikatanbyid/${Kode}`,
  DELETEJENISPENGIKATANBYID: (Kode: string) => `${api_url}/deleteJenisPengikatanbyid/${Kode}`,
  TAMBAHHUBUNGANPEMILIK: `${api_url}/tambahHubunganPemilik`,
  GETHUBUNGANPEMILIK: `${api_url}/getHubunganPemilik`,
  UPDATEHUBUNGANPEMILIKBYID: (Kode: string) => `${api_url}/updateHubunganPemilikbyid/${Kode}`,
  DELETEHUBUNGANPEMILIKBYID: (Kode: string) => `${api_url}/deleteHubunganPemilikbyid/${Kode}`,

  //Master Survey
  ADDTITLESURVEY: `${api_url}/addTitleSurvey`,
  UPDATETITLESURVEYBYID: (Kode: string) => `${api_url}/updateTitleSurveybyid/${Kode}`,
  DELETEREFSURVEYBYID: (Kode: string) => `${api_url}/deleteRefSurveybyid/${Kode}`,

  //Master Pengajuan Kredit
  GETBIDANGUSAHA: `${api_url}/getbidangusaha`,
  TAMBAHBIDANGUSAHA: `${api_url}/tambahBidangUsaha`,
  UPDATEBIDANGUSAHA: (Kode: string) => `${api_url}/updatebidangusahabyid/${Kode}`,
  DELETEBIDANGUSAHA: (Kode: string) => `${api_url}/deletebidangusahabyid/${Kode}`,
  GETSIFATKREDIT: `${api_url}/getsifatkredit`,
  TAMBAHSIFATKREDIT: `${api_url}/tambahSifatKredit`,
  UPDATESIFATKREDIT: (Kode: string) => `${api_url}/updateSifatKreditbyid/${Kode}`,
  DELETESIFATKREDIT: (Kode: string) => `${api_url}/deleteSifatKreditbyid/${Kode}`,
  GETJENISANGURAN: `${api_url}/getjenisanguran`,
  TAMBAHJENISANGURAN: `${api_url}/tambahJenisAnguran`,
  UPDATEJENISANGURAN: (Kode: string) => `${api_url}/updateJenisAnguranbyid/${Kode}`,
  DELETEJENISANGURAN: (Kode: string) => `${api_url}/deleteJenisAnguranbyid/${Kode}`,
  GETJENISPERMOHONAN: `${api_url}/getjenispermohonan`,
  TAMBAHJENISPERMOHONAN: `${api_url}/tambahJenisPermohonan`,
  UPDATEJENISPERMOHONAN: (Kode: string) => `${api_url}/updateJenisPermohonanbyid/${Kode}`,
  DELETEJENISPERMOHONAN: (Kode: string) => `${api_url}/deleteJenisPermohonanbyid/${Kode}`,

  //Master Pemohon
  GETSEKTOREKONOMI: `${api_url}/getsektorekonomi`,
  TAMBAHSEKTORPEMOHON: `${api_url}/tambahSektorEkonomi`,
  UPDATESEKTORPERMOHON: (Kode: string) => `${api_url}/updatesektorekonomibyid/${Kode}`,
  DELETESEKTORPERMOHON: (Kode: string) => `${api_url}/deletesektorekonomibyid/${Kode}`,
  GETSTATUSUSAHA: `${api_url}/getstatususaha`,
  TAMBAHSTATUSUSAHA: `${api_url}/tambahStatusUsaha`,
  UPDATESTATUSUSAHA: (Kode: string) => `${api_url}/updatestatususahabyid/${Kode}`,
  DELETESTATUSUSAHA: (Kode: string) => `${api_url}/deletestatususahabyid/${Kode}`,
  GETSTATUSTEMPATTINGGAL: `${api_url}/getstatusTempatTinggal`,
  TAMBAHSTATUSTEMPATTINGGAL: `${api_url}/tambahStatusTempatTinggal`,
  UPDATESTATUSTEMPATTINGGAL: (Kode: string) => `${api_url}/updatestatusTempatTinggalbyid/${Kode}`,
  DELETESTATUSTEMPATTINGGAL: (Kode: string) => `${api_url}/deletestatusTempatTinggalbyid/${Kode}`,
  GETPROFESISAMPAINGAN: `${api_url}/getprofesisampingan`,
  TAMBAHPROFESISAMPAINGAN: `${api_url}/tambahProfesiSampingan`,
  UPDATEPROFESISAMPAINGAN: (Kode: string) => `${api_url}/updateprofesisampinganbyid/${Kode}`,
  DELETEPROFESISAMPAINGAN: (Kode: string) => `${api_url}/deleteprofesisampinganbyid/${Kode}`,
  CHECKCIF: (cif: string) => `${api_url}/check-cif/${cif}`,

  //Negara
  GETNEGARA: `${api_url}/getNegara`,
  TAMBAHNEGARA: `${api_url}/tambahNegara`,
  UPDATENEGARA: (Kode: string) => `${api_url}/updateNegara/${Kode}`,
  DELETENEGARA: (Kode: string) => `${api_url}/deleteNegara/${Kode}`,

  //Provinsi
  GETPROVINSI: `${api_url}/getProvinsi`,
  TAMBAHPROVINSI: `${api_url}/tambahProvinsi`,
  UPDATEPROVINSI: (Kode: string) => `${api_url}/updateProvinsi/${Kode}`,
  DELETEPROVINSI: (Kode: string) => `${api_url}/deleteProvinsi/${Kode}`,

  //Kota
  GETKOTA: `${api_url}/getKota`,
  TAMBAHKOTA: `${api_url}/tambahKota`,
  UPDATEKOTA: (Kode: string) => `${api_url}/updateKota/${Kode}`,
  DELETEKOTA: (Kode: string) => `${api_url}/deleteKota/${Kode}`,

  //Kec
  GETKEC: `${api_url}/getKec`,
  TAMBAHKEC: `${api_url}/tambahKec`,
  UPDATEKEC: (Kode: string) => `${api_url}/updateKec/${Kode}`,
  DELETEKEC: (Kode: string) => `${api_url}/deleteKec/${Kode}`,

  //Kel
  GETKEL: `${api_url}/getKel`,
  TAMBAHKEL: `${api_url}/tambahKel`,
  UPDATEKEL: (Kode: string) => `${api_url}/updateKel/${Kode}`,
  DELETEKEL: (Kode: string) => `${api_url}/deleteKel/${Kode}`,

  //Kode Pos
  GETKODEPOS: `${api_url}/getKodepos`,
  TAMBAHKODEPOS: `${api_url}/tambahKodepos`,
  UPDATEKODEPOS: (Kode: string) => `${api_url}/updateKodepos/${Kode}`,
  DELETEKODEPOS: (Kode: string) => `${api_url}/deleteKodepos/${Kode}`,

  //Navbar
  GETNAVBAR: `${api_url}/getNavbar`,
  TAMBAHNAVBAR: `${api_url}/tambahNavbar`,
  UPDATENAVBAR: (Kode: string) => `${api_url}/updateNavbar/${Kode}`,
  DELETENAVBAR: (Kode: string) => `${api_url}/deleteNavbar/${Kode}`,

  GETNAVBARLANDING: `${api_url}/getNav`,
  TAMBAHNAVBARLANDING: `${api_url}/tambahNav`,
  UPDATENAVBARLANDING: (id: string) => `${api_url}/updateNav/${id}`,
  DELETENAVBARLANDING: (id: string) => `${api_url}/deleteNav/${id}`,

  //Topbar
  GETTOPBAR: `${api_url}/getTopbar`,
  TAMBAHTOPBAR: `${api_url}/tambahTopbar`,
  UPDATETOPBAR: (Kode: string) => `${api_url}/updateTopbar/${Kode}`,
  DELETETOPBAR: (Kode: string) => `${api_url}/deleteTopbar/${Kode}`,

  //Sidebar Product
  GETSIDEBARPRODUCT: `${api_url}/getSidebarProduct`,
  TAMBAHSIDEBARPRODUCT: `${api_url}/tambahSidebarProduct`,
  UPDATESIDEBARPRODUCT: (Kode: string) => `${api_url}/updateSidebarProduct/${Kode}`,
  DELETESIDEBARPRODUCT: (Kode: string) => `${api_url}/deleteSidebarProduct/${Kode}`,

  //Gambar
  GETIMAGE: `${api_url}/getImage`,
  TAMBAHIMAGE: `${api_url}/tambahImage`,
  UPDATEIMAGE: (Kode: string) => `${api_url}/updateImage/${Kode}`,
  DELETEIMAGE: (Kode: string) => `${api_url}/deleteImage/${Kode}`,

  //Gambar page product
  GETIMAGEPRODUCT: `${api_url}/getImageProduct`,
  TAMBAHIMAGEPRODUCT: `${api_url}/tambahImageProduct`,
  UPDATEIMAGEPRODUCT: (Kode: string) => `${api_url}/updateImageProduct/${Kode}`,
  DELETEIMAGEPRODUCT: (Kode: string) => `${api_url}/deleteImageProduct/${Kode}`,

  //Gambar customer
  GETIMAGECUSTOMER: `${api_url}/getImageCustomer`,
  TAMBAHIMAGECUSTOMER: `${api_url}/tambahImageCustomer`,
  UPDATEIMAGECUSTOMER: (Kode: string) => `${api_url}/updateImageCustomer/${Kode}`,
  DELETEIMAGECUSTOMER: (Kode: string) => `${api_url}/deleteImageCustomer/${Kode}`,

  //Gambar mk lite
  GETIMAGEMKLITE: `${api_url}/getImageMkLite`,
  TAMBAHIMAGEMKLITE: `${api_url}/tambahImageMkLite`,
  UPDATEIMAGEMKLITE: (Kode: string) => `${api_url}/updateImageMkLite/${Kode}`,
  DELETEIMAGEMKLITE: (Kode: string) => `${api_url}/deleteImageMkLite/${Kode}`,

  //Deskripsi
  GETDESKRIPSI: `${api_url}/getDeskripsi`,
  TAMBAHDESKRIPSI: `${api_url}/tambahDeskripsi`,
  UPDATEDESKRIPSI: (Kode: string) => `${api_url}/updateDeskripsi/${Kode}`,
  DELETEDESKRIPSI: (Kode: string) => `${api_url}/deleteDeskripsi/${Kode}`,

  //Deskripsi product
  GETDESKRIPSIPRODUCT: `${api_url}/getDeskripsiProduct`,
  TAMBAHDESKRIPSIPRODUCT: `${api_url}/tambahDeskripsiProduct`,
  UPDATEDESKRIPSIPRODUCT: (Kode: string) => `${api_url}/updateDeskripsiProduct/${Kode}`,
  DELETEDESKRIPSIPRODUCT: (Kode: string) => `${api_url}/deleteDeskripsiProduct/${Kode}`,

  //Deskripsi customer
  GETDESKRIPSICUSTOMER: `${api_url}/getDeskripsiCustomer`,
  TAMBAHDESKRIPSICUSTOMER: `${api_url}/tambahDeskripsiCustomer`,
  UPDATEDESKRIPSICUSTOMER: (Kode: string) => `${api_url}/updateDeskripsiCustomer/${Kode}`,
  DELETEDESKRIPSICUSTOMER: (Kode: string) => `${api_url}/deleteDeskripsiCustomer/${Kode}`,

  //Deskripsi mobile kasir lite
  GETDESKRIPSIMKLITE: `${api_url}/getDeskripsiMkLite`,
  TAMBAHDESKRIPSIMKLITE: `${api_url}/tambahDeskripsiMkLite`,
  UPDATEDESKRIPSIMKLITE: (Kode: string) => `${api_url}/updateDeskripsiMkLite/${Kode}`,
  DELETEDESKRIPSIMKLITE: (Kode: string) => `${api_url}/deleteDeskripsiMkLite/${Kode}`,

  //Judul
  GETTITLE: `${api_url}/getTitle`,
  TAMBAHTITLE: `${api_url}/tambahTitle`,
  UPDATETITLE: (Kode: string) => `${api_url}/updateTitle/${Kode}`,
  DELETETITLE: (Kode: string) => `${api_url}/deleteTitle/${Kode}`,

  //Judul product
  GETTITLEPRODUCT: `${api_url}/getTitleProduct`,
  TAMBAHTITLEPRODUCT: `${api_url}/tambahTitleProduct`,
  UPDATETITLEPRODUCT: (Kode: string) => `${api_url}/updateTitleProduct/${Kode}`,
  DELETETITLEPRODUCT: (Kode: string) => `${api_url}/deleteTitleProduct/${Kode}`,

  //Judul customer
  GETTITLECUSTOMER: `${api_url}/getTitleCustomer`,
  TAMBAHTITLECUSTOMER: `${api_url}/tambahTitleCustomer`,
  UPDATETITLECUSTOMER: (Kode: string) => `${api_url}/updateTitleCustomer/${Kode}`,
  DELETETITLECUSTOMER: (Kode: string) => `${api_url}/deleteTitleCustomer/${Kode}`,

  //Judul mobile kasir lite
  GETTITLEMKLITE: `${api_url}/getTitleMkLite`,
  TAMBAHTITLEMKLITE: `${api_url}/tambahTitleMkLite`,
  UPDATETITLEMKLITE: (Kode: string) => `${api_url}/updateTitleMkLite/${Kode}`,
  DELETETITLEMKLITE: (Kode: string) => `${api_url}/deleteTitleMkLite/${Kode}`,

  //Section Landing
  GETSECTION: `${api_url}/getSection`,
  TAMBAHSECTION: `${api_url}/tambahSection`,
  UPDATESECTION: (Kode: string) => `${api_url}/updateSection/${Kode}`,
  DELETESECTION: (Kode: string) => `${api_url}/deleteSection/${Kode}`,


};