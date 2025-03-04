import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTableImage from '../../component/datatable2/page';

const TambahGambar = () => {
    const [Image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);
    // const [formData, setFormData] = useState ([
    //     image: ''
    // ])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const imageResponse = await axios.get(API_ENDPOINTS.GETIMAGE);
            setImage(imageResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (Image: File) => {
        try {
            const formData = new FormData();
            formData.append("Image", Image);

            await axios.post(API_ENDPOINTS.TAMBAHIMAGE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Gambar berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan gambar', life: 3000 });
        }
    };

    const handleUpdate = async (Kode: string, Image: File) => {
        try {
            const formData = new FormData();
            formData.append("Image", Image);

            await axios.post(API_ENDPOINTS.UPDATEIMAGE(Kode), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Gambar berhasil diperbarui', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal memperbarui gambar', life: 3000 });
        }
    };

    const handleDelete = async (Kode: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEIMAGE(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Gambar berhasil dihapus', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus gambar', life: 3000 });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            {isLoading ? (
                <div className="flex justify-content-center align-items-center">
                    <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            ) : (
                <DataTableImage
                    data={Image}
                    loading={isLoading}
                    singleInput={true} // set false jika btuh 2 input
                    columns={[
                        { field: 'Image', header: 'Image', }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="Image"
                    inputLabel="Image"
                />
            )}
        </>
    );
};

export default TambahGambar;