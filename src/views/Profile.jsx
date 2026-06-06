import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { API_URL } from '../config/api'
import { CiHome, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaRegPaperPlane, FaImage, FaHeart, FaRegComment } from "react-icons/fa";
import { MdOutlineSmartDisplay } from "react-icons/md";


const Profile = () => {
    const { userId } = useParams()
    const urlPosts = `${API_URL}/users/${userId}/posts`
    const { loading, data, error } = useFetch(urlPosts)

    console.log(data);
    const [files, setFiles] = useState([])

    const handleGetPost = (id) => {
        console.log(id);
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setFiles(files)
    }

    const submitPost = async (e) => {

        e.preventDefault()
        const formData = new FormData()
        formData.append('description', 'Nuevo Post!')
        formData.append('user_id', userId)

        files.forEach((e) => {
            formData.append('files', e)
        })

        try {
            const res = await fetch(`${API_URL}/posts/`, {
                method: 'POST',
                body: formData
            })

            const post = await res.json()
            console.log(post)
            setFiles([])
            e.target.reset()
        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                            D
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="text-2xl font-semibold text-gray-900">Diego</h1>
                                <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors">
                                    Seguir
                                </button>
                            </div>
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-900">{data.length}</span>
                                    <span className="text-gray-600 ml-1">posts</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-900">0</span>
                                    <span className="text-gray-600 ml-1">seguidores</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-900">0</span>
                                    <span className="text-gray-600 ml-1">siguiendo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-6 pb-24">
                {loading && (
                    <div className="text-center py-12 text-gray-500">Cargando posts...</div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-500">Error: {error}</div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="text-center py-16">
                        <FaImage className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Aún no hay posts</p>
                    </div>
                )}

                {!loading && data.length > 0 && (
                    <div className="grid grid-cols-3 gap-1 md:gap-0.5">
                        {data.map((post) => {
                            const coverUrl = post.images?.[0]?.url

                            return (
                                <Link
                                    key={post.id}
                                    to={`/posts/${post.id}`}
                                    className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer"
                                >
                                    {coverUrl ? (
                                        <img
                                            src={coverUrl}
                                            alt={post.description}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
                                            <FaImage className="w-10 h-10 text-white/40" />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-5 text-white font-semibold text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <FaHeart className="w-5 h-5" />
                                                <span>{post.likes_count ?? 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <FaRegComment className="w-5 h-5" />
                                                <span>{post.comments_count ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}

                <form name='uploadForm' onSubmit={submitPost}>
                    <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                    
                    <div>
                        <input type="submit" value="Send File" />
                    </div>
                </form>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
                <div className="max-w-4xl mx-auto flex justify-around items-center h-16">
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                        <CiHome className="w-7 h-7" />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                        <MdOutlineSmartDisplay className="w-7 h-7" />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                        <FaRegPaperPlane className="w-7 h-7" />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                        <CiSearch className="w-7 h-7" />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                        <CgProfile className="w-7 h-7" />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Profile
