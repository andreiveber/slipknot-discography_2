import { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import SongList from './SongList';
import { FaRegSave } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import { HiPencilAlt } from "react-icons/hi";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { HiXCircle } from "react-icons/hi2";

const initialAlbums = [
    {
        id: 1,
        title: "Slipknot",
        year: 1999,
        image: "/albums/slipknot.jpg",
        songs: [
            "742617000027",
            "(sic)",
            "Eyeless",
            "Wait and Bleed",
            "Surfacing",
            "Spit It Out",
            "Tattered & Torn",
            "Frail Limb Nursery",
            "Purity",
            "Liberate",
            "Prosthetics",
            "No Life",
            "Diluted",
            "Only One",
            "Scissors",
            "Eeyore"
        ]
    },
    {
        id: 2,
        title: "Iowa",
        year: 2001,
        image: "/albums/iowa.jpg",
        songs: [
            "(515)",
            "People = Shit",
            "Disasterpiece",
            "My Plague",
            "Everything Ends",
            "The Heretic Anthem",
            "Gently",
            "Left Behind",
            "The Shape",
            "I Am Hated",
            "Skin Ticket",
            "New Abortion",
            "Metabolic",
            "Iowa"
        ]
    },
    {
        id: 3,
        title: "Vol. 3: (The Subliminal Verses)",
        year: 2004,
        image: "/albums/vol3.jpg",
        songs: [
            "Prelude 3.0",
            "The Blister Exists",
            "Three Nil",
            "Duality",
            "Opium of the People",
            "Circle",
            "Welcome",
            "Vermilion",
            "Pulse of the Maggots",
            "Before I Forget",
            "Vermilion Pt. 2",
            "The Nameless",
            "The Virus of Life",
            "Danger - Keep Away"
        ]
    },
    {
        id: 4,
        title: "All Hope Is Gone",
        year: 2008,
        image: "/albums/all_hope_is_gone.jpg",
        songs: [
            "Execute",
            "Gematria (The Killing Name)",
            "Sulfur",
            "Psychosocial",
            "Dead Memories",
            "Vendetta",
            "Butcher's Hook",
            "Gehenna",
            "This Cold Black",
            "Wherein Lies Continue",
            "Snuff",
            "All Hope Is Gone"
        ]
    },
    {
        id: 5,
        title: ".5: The Gray Chapter",
        year: 2014,
        image: "/albums/gray_chapter.jpg",
        songs: [
            "XIX",
            "Sarcastrophe",
            "AOV",
            "The Devil in I",
            "Killpop",
            "Skeptic",
            "Lech",
            "Goodbye",
            "Nomadic",
            "The One That Kills the Least",
            "Custer",
            "Be Prepared for Hell",
            "The Negative One",
            "If Rain Is What You Want"
        ]
    },
    {
        id: 6,
        title: "We Are Not Your Kind",
        year: 2019,
        image: "/albums/we_are_not_your_kind.jpg",
        songs: [
            "Insert Coin",
            "Unsainted",
            "Birth of the Cruel",
            "Death Because of Death",
            "Nero Forte",
            "Critical Darling",
            "A Liar's Funeral",
            "Red Flag",
            "What's Next",
            "Spiders",
            "Orphan",
            "My Pain",
            "Not Long for This World",
            "Solway Firth"
        ]
    }
];

const getNextId = (albumsArray) => {
    const maxId = albumsArray.reduce((max, album) => Math.max(max, album.id), 0);
    return maxId + 1;
};

function AlbumCollection() {
    const [albums, setAlbums] = useState(initialAlbums.map(album => ({ ...album, isListened: false })));
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newSongs, setNewSongs] = useState('');
    const [notification, setNotification] = useState({ icon: null, text: '', type: '' });

    useEffect(() => {
        if (notification.text) {
            const timer = setTimeout(() => {
                setNotification({ icon: null, text: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (icon, text, type = 'success') => {
        setNotification({ icon, text, type });
    };

    const deleteAlbum = (id) => {
        const deletedAlbum = albums.find(a => a.id === id);
        setAlbums(albums.filter(album => album.id !== id));
        showNotification(<FaTrashAlt />, `Альбом "${deletedAlbum?.title}" удалён`, 'danger');
    };

    const toggleListened = (id) => {
        const album = albums.find(a => a.id === id);
        const newStatus = !album?.isListened;
        setAlbums(albums.map(album =>
            album.id === id ? { ...album, isListened: newStatus } : album
        ));
        const icon = newStatus ? <FaCheckCircle /> : <HiXCircle />;
        const message = `"${album?.title}" ${newStatus ? 'отмечен как прослушанный' : 'отмечен как непрослушанный'}`;
        showNotification(icon, message, 'info');
    };

    const addAlbum = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newYear) return;
        const songsArray = newSongs.split(',').map(s => s.trim()).filter(s => s);
        const newId = getNextId(albums);
        const newAlbum = {
            id: newId,
            title: newTitle.trim(),
            year: parseInt(newYear, 10),
            image: '/test-album.png',
            songs: songsArray.length ? songsArray : ['Нет песен'],
            isListened: false
        };
        setAlbums([newAlbum, ...albums]);
        setNewTitle('');
        setNewYear('');
        setNewSongs('');
        setShowForm(false);
        showNotification(<MdAddCircle />, `Альбом "${newAlbum.title}" добавлен`, 'success');
    };

    const startEdit = (album) => {
        setEditingAlbum(album);
        setNewTitle(album.title);
        setNewYear(album.year.toString());
        setNewSongs(album.songs.join(', '));
        setShowForm(true);
    };

    const updateAlbum = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newYear) return;
        const songsArray = newSongs.split(',').map(s => s.trim()).filter(s => s);
        const updatedAlbum = {
            ...editingAlbum,
            title: newTitle.trim(),
            year: parseInt(newYear, 10),
            songs: songsArray.length ? songsArray : ['Нет песен'],
            image: editingAlbum.image,
        };
        setAlbums(albums.map(album => album.id === editingAlbum.id ? updatedAlbum : album));
        setEditingAlbum(null);
        setNewTitle('');
        setNewYear('');
        setNewSongs('');
        setShowForm(false);
        showNotification(<IoMdRefresh />, `Альбом "${updatedAlbum.title}" обновлён`, 'success');
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingAlbum(null);
        setNewTitle('');
        setNewYear('');
        setNewSongs('');
    };

    const handleAlbumClick = (album) => setSelectedAlbum(album);
    const handleCloseModal = () => setSelectedAlbum(null);

    return (
        <>
            {notification.text && (
                <div className={`toast-notification toast-${notification.type}`}>
                    <span className="me-2">{notification.icon}</span> {notification.text}
                </div>
            )}

            <div className="text-center mb-4">
                <button className="btn btn-success btn-lg" onClick={() => {
                    if (showForm) cancelForm();
                    else { setEditingAlbum(null); setShowForm(true); }
                }}>
                    {showForm ? <RxCross1 className="me-1" /> : <IoAddOutline className="me-1" />}
                    {showForm ? ' Отменить' : ' Добавить альбом'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-5 p-3 bg-dark text-white">
                    <h4 className="mb-3">{editingAlbum ? 'Редактировать альбом' : 'Добавить новый альбом'}</h4>
                    <form onSubmit={editingAlbum ? updateAlbum : addAlbum}>
                        <div className="mb-3">
                            <label className="form-label">Название альбома</label>
                            <input type="text" className="form-control" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Год выпуска</label>
                            <input type="number" className="form-control" value={newYear} onChange={e => setNewYear(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Список песен (через запятую)</label>
                            <textarea className="form-control" rows="3" value={newSongs} onChange={e => setNewSongs(e.target.value)} placeholder="Например: Песня 1, Песня 2" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <FaRegSave className="me-1" /> {editingAlbum ? 'Сохранить изменения' : 'Сохранить альбом'}
                        </button>
                        {editingAlbum && (
                            <button type="button" className="btn btn-secondary ms-2" onClick={cancelForm}>Отмена</button>
                        )}
                    </form>
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {albums.map((album) => (
                    <AlbumCard
                        key={album.id}
                        album={album}
                        onAlbumClick={handleAlbumClick}
                        onDelete={deleteAlbum}
                        onToggleListened={toggleListened}
                        onEdit={startEdit}
                    />
                ))}
            </div>

            {selectedAlbum && <SongList album={selectedAlbum} onClose={handleCloseModal} />}
        </>
    );
}

export default AlbumCollection;