// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';

// const DataTableWithCRUD = ({
//     data,
//     onAdd,
//     onUpdate,
//     onDelete,
//     columns,
//     idField = 'id',
//     addButtonLabel = 'Tambah',
//     editButtonLabel = 'Perbarui',
//     deleteButtonLabel = 'Hapus',
//     addDialogHeader = 'Tambah Data',
//     editDialogHeader = 'Edit Data',
//     deleteDialogHeader = 'Hapus Data'
// }: any) => {
//     const [selectedRow, setSelectedRow] = useState<any>(null);
//     const [visibleAdd, setVisibleAdd] = useState(false);
//     const [visibleEdit, setVisibleEdit] = useState(false);
//     const [visibleDelete, setVisibleDelete] = useState(false);
//     const [inputData, setInputData] = useState<any>({ kode_navbar: '', nama: '', link_to: '' });
//     const [editData, setEditData] = useState<any>({ kode_navbar: '', nama: '', link_to: '' });

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onAdd(inputData.kode_navbar, inputData.nama, inputData.link_to);
//         setInputData({ kode_navbar: '', nama: '', link_to: '' });
//         setVisibleAdd(false);
//     };

//     const handleUpdate = () => {
//         onUpdate(selectedRow[idField], editData.kode_navbar, editData.nama, editData.link_to);
//         setVisibleEdit(false);
//     };

//     return (
//         <div className="mb-5">
//             <div className="flex justify-between mb-3">
//                 <Button label={addButtonLabel} icon="pi pi-plus" className="bg-blue-500 w-auto hover:scale-110" onClick={() => setVisibleAdd(true)} />
//             </div>
            
//             <DataTable value={data} responsiveLayout="stack" paginator rows={5} rowsPerPageOptions={[5, 10]}>
//                 {columns.map((col: any) => (
//                     <Column key={col.field} field={col.field} header={col.header} />
//                 ))}
//                 <Column header="Perbarui" body={(rowData) => (
//                     <Button icon="pi pi-pencil" className="bg-blue-500 border-transparent hover:scale-110" onClick={() => {
//                         setSelectedRow(rowData);
//                         setEditData({ kode_navbar: rowData.kode_navbar, nama: rowData.nama, link_to: rowData.link_to });
//                         setVisibleEdit(true);
//                     }} />
//                 )} />
//                 <Column header="Hapus" body={(rowData) => (
//                     <Button icon="pi pi-trash" className="bg-red-500 border-transparent hover:scale-110" onClick={() => {
//                         setSelectedRow(rowData);
//                         setVisibleDelete(true);
//                     }} />
//                 )} />
//             </DataTable>

//             {/* Dialog Konfirmasi Hapus */}
//             <Dialog header={${deleteDialogHeader} ${selectedRow?.nama}} visible={visibleDelete} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleDelete(false)}>
//                 <p>Apakah Anda yakin ingin menghapus data ini?</p>
//                 <div className="flex justify-end mt-3">
//                     <Button label="Batal" className="p-button-text" onClick={() => setVisibleDelete(false)} />
//                     <Button label="Hapus" icon="pi pi-check" className="p-button-danger" onClick={() => {
//                         onDelete(selectedRow[idField]);
//                         setVisibleDelete(false);
//                     }} />
//                 </div>
//             </Dialog>

//             <Dialog header={addDialogHeader} visible={visibleAdd} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleAdd(false)}>
//                 <form onSubmit={handleSubmit}>
//                     <div className="field">
//                         <label className="font-bold">Kode Navbar</label>
//                         <InputText value={inputData.kode_navbar} onChange={(e) => setInputData({ ...inputData, kode_navbar: e.target.value })} required className="w-full" />
//                     </div>
//                     <div className="field">
//                         <label className="font-bold">Nama</label>
//                         <InputText value={inputData.nama} onChange={(e) => setInputData({ ...inputData, nama: e.target.value })} required className="w-full" />
//                     </div>
//                     <div className="field">
//                         <label className="font-bold">Link</label>
//                         <InputText value={inputData.link_to} onChange={(e) => setInputData({ ...inputData, link_to: e.target.value })} required className="w-full" />
//                     </div>
//                     <div className="flex justify-end mt-3">
//                         <Button type="submit" label="Simpan" icon="pi pi-check" />
//                     </div>
//                 </form>
//             </Dialog>

//             <Dialog header={editDialogHeader} visible={visibleEdit} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleEdit(false)}>
//                 <div className="field">
//                     <label className="font-bold">Kode Navbar</label>
//                     <InputText value={editData.kode_navbar} onChange={(e) => setEditData({ ...editData, kode_navbar: e.target.value })} required className="w-full" />
//                 </div>
//                 <div className="field">
//                     <label className="font-bold">Nama</label>
//                     <InputText value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} required className="w-full" />
//                 </div>
//                 <div className="field">
//                     <label className="font-bold">Link</label>
//                     <InputText value={editData.link_to} onChange={(e) => setEditData({ ...editData, link_to: e.target.value })} required className="w-full" />
//                 </div>
//                 <div className="flex justify-end mt-3">
//                     <Button label="Batal" className="p-button-text" onClick={() => setVisibleEdit(false)} />
//                     <Button label={editButtonLabel} icon="pi pi-check" onClick={handleUpdate} />
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default DataTableWithCRUD;