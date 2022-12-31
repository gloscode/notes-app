import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const response = await axios
      .get(`http://localhost:3000/${id}`)
      .catch((err) => console.log(err));
    try {
      const data = await response.data;
      return data;
    } catch (err) {
      navigate("/notfound")
    }
  };

  useEffect(() => {
    fetchNotes().then((data) => {
      setNote(data);
    });
  }, []);

  return (
    <div className="container text-white">
      <h1 className="my-4">{note?.title}</h1>
      <ReactMarkdown
        children={note?.description}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Note;