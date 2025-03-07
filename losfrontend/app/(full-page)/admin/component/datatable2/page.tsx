import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import { Toast } from 'primereact/toast';


const DataTableImage = ({
    data,
    data2,
    onAdd,
    onUpdate,
    onDelete,
    columns,
    singleInput = false,
    imageInput = false,
    idField = 'Kode',
    nameField = 'image',
    nameField2 = 'provinsi_id',
    addButtonLabel = 'Tambah',
    editButtonLabel = 'Perbarui',
    deleteButtonLabel = 'Hapus',
    addDialogHeader = 'Tambah Data',
    editDialogHeader = 'Edit Data',
    deleteDialogHeader = 'Hapus Data',
    inputLabel = 'Data',
}: any) => {
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [inputValue, setInputValue] = useState<string | File>('');
    const [inputValue2, setInputValue2] = useState<any>(null);
    const [editValue, setEditValue] = useState('');
    const [editValue2, setEditValue2] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        pictures: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (singleInput) {
            onAdd(inputValue); // Send only inputValue
        } else {
            onAdd(inputValue, inputValue2?.[idField]);// Tambah value kode dari inputValue2
        }
        setInputValue('');
        setInputValue2(null);
        setVisibleAdd(false);
    };

    const handleUpdate = () => {
        if (singleInput) {
            onUpdate(selectedRow[idField], editValue);// Send only inputValue
        } else {
            onUpdate(selectedRow[idField], editValue, editValue2?.[idField]);// Tambah value kode dari inputValue2
        }
        setEditValue('');
        setEditValue2(null);
        setVisibleEdit(false);
    };

    type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const toast = useRef<Toast>(null);


    const handleImageChange = (event: any) => {
        const selectedImage = event.files?.[0];
        if (selectedImage) {
            setFile(selectedImage); // Simpan file ke state

            // Convert file ke base64 untuk pratinjau
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
    };


    // const handleImageUpload = async () => {
    //     if (!file) return;
    //     console.log('uploading', file);
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     try {
    //         await axios.post('http://localhost:8000/api/tambahImage', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log('success');
    //     } catch (error) {
    //         console.error('Error uploading', error);
    //         console.log('error');
    //     }
    // }

    const handleImageUpload = async () => {
        if (!file) return;
        console.log('uploading');
        setInputValue(file);
        try {
            console.log('success');
        } catch (error) {
            console.error('Error uploading', error);
            console.log('error');
        }
    }

    return (
        <div className='mb-5'>
            <div className='mb-2 flex justify-content-end'>
                <Button label={addButtonLabel} icon="pi pi-plus" style={{ border: 'none', color: '#333', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 w-full sm:w-auto hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => setVisibleAdd(true)} />
            </div>
            <DataTable value={data} responsiveLayout="stack" breakpoint="960px" paginator rows={5} rowsPerPageOptions={[5, 10]}>
                <Column key="Kode" field="Kode" header="Kode" className='w-full sm:w-2' />
                {columns.map((col: any) => (
                    <Column key={col.field} field={col.field} header={col.header} className={columns.length === 1 ? 'w-full sm:w-7' : 'w-full sm:w-4'} />
                ))}
                <Column header="Perbarui" body={(rowData) => (
                    <Button icon="pi pi-pencil" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 border-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setEditValue(rowData[nameField]);
                        //mengambil kode dari row dipilih dan mencari kode yang sesuai dalam data
                        if (Array.isArray(data2) && data2.length > 0 && rowData?.[nameField2]) {
                            const matchedValue = data2.find(item => item.Kode === rowData?.[nameField2]) || null;
                            //set nilai awal edit
                            setEditValue2(matchedValue);
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
                        {!imageInput && (
                            <div className="field">
                                <label htmlFor="fileUpload" className='font-bold'>Upload Media</label>
                                <FileUpload
                                    name="media"
                                    url={'http://localhost/api/tambahImage'}
                                    multiple
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    onSelect={(e) => {
                                        handleImageChange(e);
                                        const file = e.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    image: reader.result
                                                }));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                                    chooseLabel="Pilih File"
                                    cancelLabel="Batal"
                                    customUpload
                                    className="w-full"
                                    uploadHandler={handleImageUpload}
                                />
                            </div>
                        )}
                        <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                            <Button className='w-full sm:w-4' type="submit" label="Simpan" icon="pi pi-check" />
                        </div>
                    </form>
                </div>
            </Dialog>
            <Dialog header={`${editDialogHeader}: ${selectedRow?.[nameField]}`} visible={visibleEdit} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleEdit(false)}>
                <div className="p-fluid">
                    {!imageInput && (
                        <div className="field">
                            <label htmlFor="fileUpload" className='font-bold'>Upload Media</label>
                            <FileUpload
                                name="media"
                                url={'http://localhost/api/tambahImage'}
                                multiple
                                accept="image/*"
                                maxFileSize={1000000}
                                onSelect={(e) => {
                                    handleImageChange(e);
                                    const file = e.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData(prev => ({
                                                ...prev,
                                                image: reader.result
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                                chooseLabel="Pilih File"
                                cancelLabel="Batal"
                                customUpload
                                className="w-full"
                                uploadHandler={handleImageUpload}
                            />
                        </div>
                    )}
                    <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                        <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleEdit(false)} className="p-button-text w-full sm:w-3 mb-2 sm:mb-0 sm:mr-2 " />
                        <Button label={editButtonLabel} icon="pi pi-check" onClick={handleUpdate} autoFocus className="w-full sm:w-3" />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DataTableImage;