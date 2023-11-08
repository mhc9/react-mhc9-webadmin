import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

const PostList = () => {

    useEffect(() => {
        getContents();
    }, []);

    const getContents = async () => {
        const res = await api.get('/api/contents/search');
        
        console.log(res.data);
    };

    return (
        <div className="bg-white p-4" style={{ minHeight: '80vh' }}>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li>Web Content</li>
                </ul>
            </div>

            <div>
                <div className="flex flex-row justify-between items-center mb-2">
                    <h3 className="font-bold text-xl">Web Content</h3>
                    <Link to="new" className="btn btn-primary">เพิ่มรายการ</Link>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center w-[5%]">#</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="text-center w-[10%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PostList