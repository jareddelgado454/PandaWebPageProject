"use client"
import Modal from '@/components/modal/Modal'
import React, { useState } from 'react'

const EditModal = () => {
    const [showModal, setShowModal] = useState(false);

    const openModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    return (
        <div>
               
        </div>
    )
}

export default EditModal