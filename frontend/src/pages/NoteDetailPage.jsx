import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams(); // The id of the note tos be edit

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`); // Get the data route of the note to be edit
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note details:", error);
        toast.error('Failed to load note details.', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  console.log({ note });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error("Error deleting note:", error);
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and/or content cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note.");
      console.error("Error updating note:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="maxw-2xl ml-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className='btn btn-ghost'>Back to Home</Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              {/* End note title  */}

              {/* Content */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="What is your note all about?"
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              {/* End content */}

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
};

export default NoteDetailPage
