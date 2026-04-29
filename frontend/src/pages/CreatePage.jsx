import axios from 'axios';
import { ArrowBigLeftDash, ArrowLeft, LoaderCircle, MessageCircleWarningIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Route, Routes, useNavigate } from 'react-router'
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Fields are required.")
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully.");
      setTitle(""); // Clear the title field after successful creation
      setContent(""); // Clear the content field after successful creation
      setLoading(false);
      navigate("/"); // Redirect to homepage after successful creation
    } catch (error) {
      console.error("Error creating note:", error);

      if (error.response.status === 429) {
        toast.error("Too much request. Try again later.", {
          duration: 3000,
          icon: <MessageCircleWarningIcon />
        });
      } else {
        toast.error("Failed to create note.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-">
          <Link to="/" className="btn btn-ghost mb-4">
            <ArrowLeft className='size-5' />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {loading ? "Creating" : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
