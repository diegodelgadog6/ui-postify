import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { FaHeart, FaRegComment, FaArrowLeft, FaImage } from 'react-icons/fa'

const formatDate = (iso) => {
    if (!iso) return ''
    return new Date(iso).toLocaleString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const Avatar = ({ id, size = 'md' }) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
    }
    const letter = (id?.[0] ?? '?').toUpperCase()
    return (
        <div
            className={`${sizes[size]} rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center text-white font-bold shrink-0`}
        >
            {letter}
        </div>
    )
}

const Post = () => {
    const { postId } = useParams()
    const url = `http://localhost:8000/posts/${postId}`
    const { loading, data, error } = useFetch(url)

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Cargando post...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        )
    }

    if (!data || !data.id) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Post no encontrado</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
                    <Link
                        to={-1}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900">Post</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
                <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                        <Avatar id={data.user_id} size="md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 font-mono break-all">
                                {data.user_id}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {formatDate(data.created_at)}
                            </p>
                        </div>
                    </div>

                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                        <p className="text-xs text-gray-500 mb-0.5">Post ID</p>
                        <p className="text-xs text-gray-700 font-mono break-all">
                            {data.id}
                        </p>
                    </div>

                    <div className="aspect-square bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center">
                        <FaImage className="w-20 h-20 text-white/30" />
                    </div>

                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-4 text-gray-700">
                            <div className="flex items-center gap-1.5">
                                <FaHeart className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-semibold">
                                    {data.likes?.length ?? 0}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FaRegComment className="w-5 h-5 text-gray-600" />
                                <span className="text-sm font-semibold">
                                    {data.comments?.length ?? 0}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-900 break-words">
                            <span className="font-semibold font-mono break-all">
                                {data.user_id}
                            </span>{' '}
                            {data.description}
                        </p>
                    </div>
                </article>

                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                        <FaHeart className="w-4 h-4 text-red-500" />
                        Likes ({data.likes?.length ?? 0})
                    </h2>
                    {data.likes && data.likes.length > 0 ? (
                        <ul className="flex flex-col divide-y divide-gray-100">
                            {data.likes.map((like) => (
                                <li
                                    key={like.user_id}
                                    className="flex items-center gap-3 py-2"
                                >
                                    <Avatar id={like.user_id} size="sm" />
                                    <span className="text-sm text-gray-700 font-mono break-all">
                                        {like.user_id}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">Aún no hay likes</p>
                    )}
                </section>

                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                        <FaRegComment className="w-4 h-4 text-gray-600" />
                        Comentarios ({data.comments?.length ?? 0})
                    </h2>
                    {data.comments && data.comments.length > 0 ? (
                        <ul className="flex flex-col gap-4">
                            {data.comments.map((comment) => (
                                <li key={comment.id} className="flex gap-3">
                                    <Avatar id={comment.user_id} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                            <span className="text-sm font-semibold text-gray-900 font-mono break-all">
                                                {comment.user_id}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {formatDate(comment.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1 break-words">
                                            {comment.content}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">Aún no hay comentarios</p>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Post
