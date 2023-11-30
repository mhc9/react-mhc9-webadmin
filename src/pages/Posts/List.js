import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, destroy } from '../../slices/postSlice' 

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, pager, loading } = useSelector(state => state.post);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getPosts(`/api/posts/search`));
        } else {
            dispatch(getPosts(`${endpoint}${params}`));
        }
    }, [endpoint]);

    return (
        <div className="bg-white p-4" style={{ minHeight: '80vh' }}>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a href="#">หน้าหลัก</a></li>
                    <li>รายการเนื้อหา</li>
                </ul>
            </div>

            <div>
                <div className="flex flex-row justify-between items-center mb-2">
                    <h3 className="font-bold text-xl">รายการเนื้อหา</h3>
                    <Link to="new" className="btn btn-primary">สร้างเนื้อหาใหม่</Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center w-[5%]">#</th>
                            <th>หัวข้อ</th>
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
                                    <Link to={`/posts/${post.id}`} className="btn btn-warning btn-sm px-2 mr-1">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button type="button" className="btn btn-error btn-sm px-2" onClick={() => dispatch(destroy(post?.id))}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
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