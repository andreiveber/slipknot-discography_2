import { HiOutlineTrash } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi2";
import { HiPencilAlt } from "react-icons/hi";

function AlbumCard({ album, onAlbumClick, onDelete, onToggleListened, onEdit }) {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <div
                    style={{
                        aspectRatio: '1 / 1',
                        backgroundImage: `url(${album.image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#1a1a1a',
                        position: 'relative'
                    }}
                >
                    <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(album.id);
                        }}
                        style={{ zIndex: 10 }}
                    >
                        <HiOutlineTrash /> Удалить
                    </button>
                </div>

                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div
                            className="d-flex align-items-center"
                            onClick={() => onToggleListened(album.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {album.isListened ? (
                                <FaCheckCircle size={28} color="#28a745" title="Прослушано" />
                            ) : (
                                <HiXCircle size={28} color="#dc3545" title="Не прослушано" />
                            )}
                        </div>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onEdit(album)}
                            title="Редактировать"
                        >
                            <HiPencilAlt /> Редактировать
                        </button>
                    </div>

                    <h5 className="card-title">{album.title}</h5>
                    <p className="card-text"><strong>Год:</strong> {album.year}</p>
                    <p className="card-text"><strong>Песен:</strong> {album.songs.length}</p>
                    <button className="btn btn-danger w-100" onClick={() => onAlbumClick(album)}>
                        Список песен
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlbumCard;