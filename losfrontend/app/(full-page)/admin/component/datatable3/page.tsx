import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';

const DataTableWithCRUD = ({
    data,
    data2,
    data3,
    data4,
    data5,
    onAdd,
    onUpdate,
    onDelete,
    columns,
    singleInput = false,
    imageInput = false,
    idField = 'id',
    nameField = 'section',
    nameField2 = 'judul',
    nameField3 = 'deskripsi',
    nameField4 = 'id_gambar',
    nameField5 = 'kontak',
    addButtonLabel = 'Tambah',
    editButtonLabel = 'Perbarui',
    deleteButtonLabel = 'Hapus',
    addDialogHeader = 'Tambah Data',
    editDialogHeader = 'Edit Data',
    deleteDialogHeader = 'Hapus Data',
    inputLabel = 'Data',
    inputLabel2 = 'Data',
    inputLabel3 = 'Data',
    inputLabel4 = 'Data',
    inputLabel5 = 'Data',
}: any) => {
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState<{ id: number; gambar: string } | null>(null);
    const [inputValue5, setInputValue5] = useState('');
    const [editValue, setEditValue] = useState('');
    const [editValue2, setEditValue2] = useState('');
    const [editValue3, setEditValue3] = useState('');
    const [editValue4, setEditValue4] = useState('');
    const [editValue5, setEditValue5] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (singleInput) {
            onAdd(inputValue); // Send only inputValue
        } else {
            onAdd(inputValue, inputValue2, inputValue3, inputValue4, inputValue5);// Tambah value kode dari inputValue2
        }
        setInputValue('');
        setInputValue2('');
        setInputValue3('');
        setInputValue4(null);
        setInputValue5('');
        setVisibleAdd(false);
    };

    const handleUpdate = () => {
        if (singleInput) {
            onUpdate(selectedRow[idField], editValue);// Send only inputValue
        } else {
            onUpdate(selectedRow[idField], editValue, editValue2, editValue3, editValue4, editValue5);// Tambah value kode dari inputValue2
        }
        setEditValue('');
        setEditValue2('');
        setEditValue3('');
        setEditValue4('');
        setEditValue5('');
        setVisibleEdit(false);
    };

    // const handleUpload = async () => {
    //     if (!selectedImage) {
    //         return;
    //     }

    //     setIsUploading(true);

    //     try {
    //         setFormData(prevData => ({
    //             ...prevData,
    //             foto_ktp: selectedImage
    //         }));
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //         // toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengunggah foto KTP', life: 3000 });
    //     } finally {
    //         setIsUploading(false);
    //     }
    // };

    return (
        <div className='mb-5'>
            <div className='mb-2 flex justify-content-end'>
                <Button label={addButtonLabel} icon="pi pi-plus" style={{ border: 'none', color: '#333', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 w-full sm:w-auto hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => setVisibleAdd(true)} />
            </div>
            <DataTable value={data} responsiveLayout="stack" breakpoint="960px" paginator rows={5} rowsPerPageOptions={[5, 10]}>
                {/* <Column key="Kode" field="Kode" header="Kode" className='w-full sm:w-2' /> */}
                {columns.map((col: any) => (
                    <Column key={col.field} field={col.field} header={col.header} className={columns.length === 1 ? 'w-full sm:w-7' : 'w-full sm:w-4'} />
                ))}
                <Column header="Perbarui" body={(rowData) => (
                    <Button icon="pi pi-pencil" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 border-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setEditValue(rowData[nameField]);
                        //mengambil kode dari row dipilih dan mencari kode yang sesuai dalam data
                        if (Array.isArray(data2) && data2.length > 0 && rowData?.[nameField4]) {
                            const matchedValue = data2.find(item => item.id === rowData?.[nameField4]) || null;
                            //set nilai awal edit
                            setEditValue4(matchedValue);
                        }
                        setVisibleEdit(true);
                    }} />
                )} />
                <Column header="Hapus" body={(rowData) => (
                    <Button icon="pi pi-trash" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-red-200 border-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setVisibleDelete(true);
                        console.log(rowData);
                    }} />
                )} />
            </DataTable>
            <Dialog header={`${deleteDialogHeader} ${selectedRow?.[nameField]}`} visible={visibleDelete} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleDelete(false)}>
                <label htmlFor="">Apakah anda yakin ingin menghapus data ini?</label>
                <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                    <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text mb-2 sm:mb-0 sm:mr-2" />
                    <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => { onDelete(selectedRow[idField]); setVisibleDelete(false); }} />
                </div>
            </Dialog>
            <Dialog header={addDialogHeader} visible={visibleAdd} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleAdd(false)}>
                <div className="p-fluid mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="inputValue" className='font-bold'>{inputLabel}</label>
                            <InputText
                                id="inputValue"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required className="w-full"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="inputValue2" className='font-bold'>{inputLabel2}</label>
                            <InputText
                                id="inputValue2"
                                value={inputValue2}
                                onChange={(e) => setInputValue2(e.target.value)}
                                required className="w-full"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="inputValue3" className='font-bold'>{inputLabel3}</label>
                            <InputText
                                id="inputValue3"
                                value={inputValue3}
                                onChange={(e) => setInputValue3(e.target.value)}
                                required className="w-full"
                            />
                        </div>
                        {!singleInput && (
                            <div className="field">
                                <label htmlFor="dropdown" className='font-bold'>{inputLabel4}</label>
                                <Dropdown
                                    id="dropdown"
                                    value={inputValue4}
                                    options={data4}
                                    onChange={(e) => setInputValue4(e.value)}
                                    optionLabel='id'
                                    placeholder="Pilih Opsi"
                                    className="w-full"
                                />
                                {inputValue4 && (
                                    <div className="mt-2 p-2 border border-gray-300 rounded">
                                        <p><strong>Gambar:</strong> {inputValue4.gambar}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="field">
                            <label htmlFor="inputValue5" className='font-bold'>{inputLabel5}</label>
                            <InputText
                                id="inputValue5"
                                value={inputValue5}
                                onChange={(e) => setInputValue5(e.target.value)}
                                required className="w-full"
                            />
                        </div>
                        <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                            <Button className='w-full sm:w-4' type="submit" label="Simpan" icon="pi pi-check" />
                        </div>
                    </form>
                </div>
            </Dialog>
            <Dialog header={`${editDialogHeader}: ${[nameField, nameField2, nameField3, nameField4, nameField5]
                .map(field => selectedRow?.[field])
                .filter(value => value)
                .join(", ")}`} visible={visibleEdit} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleEdit(false)}>
                <div className="p-fluid">
                    <label htmlFor="inputValue" className='font-bold'>{inputLabel}</label>
                    <InputText
                        id="inputValue"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="inputValue2" className='font-bold'>{inputLabel2}</label>
                    <InputText
                        id="inputValue2"
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        required className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="inputValue3" className='font-bold'>{inputLabel3}</label>
                    <InputText
                        id="inputValue3"
                        value={inputValue3}
                        onChange={(e) => setInputValue3(e.target.value)}
                        required className="w-full"
                    />
                </div>
                {!singleInput && (
                    <div className="field">
                        <label htmlFor="dropdown" className='font-bold'>{inputLabel4}</label>
                        <Dropdown
                            id="dropdown"
                            value={inputValue4}
                            options={data2}
                            onChange={(e) => setInputValue4(e.value)}
                            optionLabel='gambar'
                            placeholder="Pilih Opsi"
                            className="w-full"
                        />
                    </div>
                )}
                <div className="field">
                    <label htmlFor="inputValue5" className='font-bold'>{inputLabel5}</label>
                    <InputText
                        id="inputValue5"
                        value={inputValue5}
                        onChange={(e) => setInputValue5(e.target.value)}
                        required className="w-full"
                    />
                </div>
                <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                    <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleEdit(false)} className="p-button-text w-full sm:w-3 mb-2 sm:mb-0 sm:mr-2 " />
                    <Button label={editButtonLabel} icon="pi pi-check" onClick={handleUpdate} autoFocus className="w-full sm:w-3" />
                </div>

            </Dialog>
        </div>
    );
};

export default DataTableWithCRUD;