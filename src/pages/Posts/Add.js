import React from 'react'
import ContentForm from './Form'
import { Link } from 'react-router-dom'

const AddPost = () => {
    return (
        <div className="bg-white p-4" style={{ minHeight: '80vh' }}>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a href="#">หน้าหลัก</a></li>
                    <li>สร้างข่าวใหม่</li>
                </ul>
            </div>

            <div>
                <div className="flex flex-row justify-between items-center mb-1">
                    <h3 className="font-bold text-xl">สร้างข่าวใหม่</h3>
                </div>

                <div className="border rounded-lg px-3 pt-4">
                    <ContentForm />
                </div>
            </div>
        </div>
    )
}

export default AddPost