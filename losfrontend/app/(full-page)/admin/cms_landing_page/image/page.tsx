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
    const [idSection, setIdSection] = useState<string | number>("");
    const toast = useRef<Toast>(null);
    const idSectionRef = useRef<string | number>("");

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
            console.log("Teks:", imageResponse.data.text);
            console.log("Gambar URL:", imageResponse.data.gambar);

            setImage(imageResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (id_section: string | number, gambar: File) => {
        if (!gambar) {
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Silakan pilih gambar terlebih dahulu', life: 3000 });
            return;
        }
        idSectionRef.current = id_section;

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif'];
        if (!validTypes.includes(gambar.type)) {
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Format gambar tidak didukung (harus jpg/png)', life: 3000 });
            return;
        }

        if (gambar.size > 2 * 1024 * 1024) { // Batas 2MB
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Ukuran gambar terlalu besar (maks 2MB)', life: 3000 });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("id_section", isNaN(Number(id_section)) ? "" : String(Number(id_section)));
            formData.append("gambar", gambar);


            await axios.post(API_ENDPOINTS.TAMBAHIMAGE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Gambar berhasil ditambahkan', life: 3000 });
            fetchData();

            setIdSection(idSectionRef.current);
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    // const handleAdd = async (image: File) => {
    //     try {
    //         await axios.post(API_ENDPOINTS.TAMBAHIMAGE, { image });
    //         toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Gambar berhasil ditambahkan', life: 3000 });
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error adding data:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
    //     }
    // };

    const handleUpdate = async (Kode: string, gambar: File) => {
        try {
            const formData = new FormData();
            formData.append("image", gambar);

            await axios.put(API_ENDPOINTS.UPDATEIMAGE(Kode), formData, {
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
                    singleInput={false} // set false jika btuh 2 input
                    columns={[
                        { field: 'id_section', header: 'Id Section', },
                        { field: 'gambar', header: 'Gambar' }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="id_section"
                    nameField2="gambar"
                    inputLabel="Id Section"
                    inputLabel2="Gambar"
                    value1={idSection}
                    onChange1={(event: any) => setIdSection(event.target.value)}
                />
            )}
        </>
    );
};

export default TambahGambar;