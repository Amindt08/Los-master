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
    idField = 'id',
    nameField = 'id_section',
    nameField2 = 'gambar',
    addButtonLabel = 'Tambah',
    editButtonLabel = 'Perbarui',
    deleteButtonLabel = 'Hapus',
    addDialogHeader = 'Tambah Data',
    editDialogHeader = 'Edit Data',
    deleteDialogHeader = 'Hapus Data',
    inputLabel = 'Data',
    inputLabel2 = 'Data'
}: any) => {
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [inputValue, setInputValue] = useState<string | number>('');
    const [inputValue2, setInputValue2] = useState<any>(null);
    const [editValue, setEditValue] = useState('');
    const [editValue2, setEditValue2] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState<{ id_section: string | number; gambar: File | null }>({
        id_section: '',
        gambar: null,
    });


    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     console.log("Data yang dikirim:", formData);

    //     if (singleInput) {
    //         onAdd(inputValue); // Send only inputValue
    //     } else {
    //         onAdd(inputValue, inputValue2);// Tambah value kode dari inputValue2
    //     }

    //     setInputValue('');
    //     setInputValue2(null);
    //     setVisibleAdd(false);
    // };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Data yang dikirim:", formData);

        if (singleInput) {
            onAdd(formData.id_section); // Kirim id_section
        } else {
            onAdd(formData.id_section, inputValue2); // inputValue2 harus dideklarasikan
        }

        // Reset state setelah submit
        setFormData({ id_section: '', gambar: null });
        setVisibleAdd(false);
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!formData.inputValue) {
    //         alert("Field inputValue harus diisi!");
    //         return;
    //     }

    //     const formDataToSend = new FormData();
    //     formDataToSend.append("id_section", formData.inputValue);
    //     if (formData.gambar) {
    //         formDataToSend.append("gambar", formData.gambar);
    //     }

    //     onAdd(formDataToSend); // Kirim sebagai FormData

    //     setFormData({ inputValue: '', gambar: null });
    //     setFile(null);
    //     setVisibleAdd(false);
    // };

    const handleUpdate = () => {
        if (singleInput) {
            onUpdate(selectedRow[idField], editValue);// Send only inputValue
        } else {
            onUpdate(selectedRow[idField], editValue, editValue2);// Tambah value kode dari inputValue2
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
            setFile(selectedImage);

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
    };


    // const handleImageUpload = async () => {
    //     if (!file) {
    //         console.warn("Tidak ada file yang dipilih");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("id_section", inputValue); // Kirim ID section
    //     formData.append("gambar", file); // Kirim file gambar

    //     try {
    //         console.log('Uploading...');
    //         const response = await fetch("http://localhost/api/tambahImage", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         const result = await response.json();
    //         if (response.ok) {
    //             console.log("Upload berhasil:", result);
    //         } else {
    //             console.error("Upload gagal:", result);
    //         }
    //     } catch (error) {
    //         console.error("Error uploading", error);
    //     }
    // };



    // const handleImageChange = (event: any) => {
    //     const file = event.files?.[0];
    //     console.log('image change')
    //     if (file) {
    //         setFormData(prev => ({
    //             ...prev,
    //             gambar: file
    //         }));
    //     }
    // };

    const handleImageUpload = async () => {
        if (!file) return;
        console.log('uploading');
        setInputValue2(file);
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
                {/* <Column key="id_section" field="id_section" header="Id Section" className='w-full sm:w-2' /> */}
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
                        <div className="field">
                            <label htmlFor="id_section" className='font-bold'>{inputLabel}</label>
                            <InputText
                                id="id_section"
                                value={formData.id_section}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        id_section: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value)
                                    }))
                                }
                                required
                                className="w-full"
                            />
                        </div>
                        {!imageInput && (
                            <div className="field">
                                <label htmlFor="fileUpload" className='font-bold'>{inputLabel2}</label>
                                <FileUpload
                                    name="media"
                                    // url={'http://localhost/api/tambahImage'}
                                    multiple
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    onSelect={(e) => {
                                        handleImageChange(e);
                                        const file = e.files?.[0];
                                        console.log('image change')
                                        if (file) {
                                            setFormData(prev => ({
                                                ...prev,
                                                gambar: file
                                            }));
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
                    <div className="field">
                        <label htmlFor="id_section" className='font-bold'>{inputLabel}</label>
                        <InputText
                            id="id_section"
                            value={formData.id_section}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    id_section: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value)
                                }))
                            }
                            required
                            className="w-full"
                        />
                    </div>
                    {!imageInput && (
                        <div className="field">
                            <label htmlFor="fileUpload" className='font-bold'>{inputLabel2}</label>
                            <FileUpload
                                name="media"
                                // url={'http://localhost/api/tambahImage'}
                                multiple
                                accept="image/*"
                                maxFileSize={1000000}
                                onSelect={(e) => {
                                    handleImageChange(e);
                                    const file = e.files?.[0];
                                    console.log('image change')
                                    if (file) {
                                        setFormData(prev => ({
                                            ...prev,
                                            gambar: file
                                        }));
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