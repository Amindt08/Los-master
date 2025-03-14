"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import TambahGambarProduct from './image_customer/page';
import TambahDeskripsi from './deskripsi/page';
import TambahTitleProduct from './title/page';

const TambahanAnalisaKredit = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className='text-2xl font-bold mb-4'>CMS Customer Page</h2>
            <TabView activeIndex={1}>
                <Toast ref={toast} />
                <TabPanel header="Tambah Judul">
                    <TambahTitleProduct />
                </TabPanel>
                <TabPanel header="Tambah Gambar">
                    <TambahGambarProduct />
                </TabPanel>
                <TabPanel header="Tambah Deskripsi">
                    <TambahDeskripsi />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default TambahanAnalisaKredit;