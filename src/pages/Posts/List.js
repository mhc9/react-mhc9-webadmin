import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const res = await api.get('/api/posts/search');
        const { data, ...pager } = res.data;

        setPosts(data);
    };

    return (
        <div className="bg-white p-4" style={{ minHeight: '80vh' }}>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a href="#">หน้าหลัก</a></li>
                    <li>รายการข่าว</li>
                </ul>
            </div>

            <div>
                <div className="flex flex-row justify-between items-center mb-2">
                    <h3 className="font-bold text-xl">รายการข่าวทั้งหมด</h3>
                    <Link to="new" className="btn btn-primary">เพิ่มรายการ</Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center w-[5%]">#</th>
                            <th>หัวข้อข่าว</th>
                            <th className="text-center w-[20%]">ผู้แต่ง</th>
                            <th className="text-center w-[15%]">ประเภท</th>
                            <th className="text-center w-[10%]">วันที่เผยแพร่</th>
                            <th className="text-center w-[10%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.map((post, index) => (
                            <tr key={post.id} className={`${index%2 === 0 ? 'hover' : ''}`}>
                                <td className="text-center">{index+1}</td>
                                <td>{post.title}</td>
                                <td className="text-center">{post.author?.name}</td>
                                <td className="text-center">{post.category?.name}</td>
                                <td className="text-center">{post.publish_up}</td>
                                <td className="text-center">
                                    <Link className="btn btn-warning btn-sm px-2 mr-1">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <Link className="btn btn-error btn-sm px-2">
                                        <i className="fas fa-trash-alt"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PostList