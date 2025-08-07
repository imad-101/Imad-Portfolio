"use client"

import React, { useState } from 'react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { FaCode, FaListUl, FaListOl, FaPencil } from 'react-icons/fa6'
import { GrUndo, GrRedo, GrBlockQuote, GrBold } from "react-icons/gr";
import { MdOutlineHorizontalRule, MdOutlineFormatItalic } from "react-icons/md";
import { BiCodeBlock, BiImage } from "react-icons/bi";
import { LuHeading1, LuHeading2, LuHeading3, LuStrikethrough } from "react-icons/lu";
import { RiText } from "react-icons/ri";
import './styles.scss'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type MenuBarProps = {
    editor: Editor | null;
};


const MenuBar = ({ editor }: MenuBarProps) => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>();
    const [isDropDown, setIsDropDown] = useState(false)

    const handleImageUrl = () => {
        if (imageUrl) {
            if (!editor) return
            editor.chain().focus().setImage({ src: imageUrl }).run()
            setImageUrl('')
            setIsDropDown(false)
        }
    }

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="control-group mt-10 fixed bottom-7 left-[25vw] max-sm:left-0 z-20 bg-black bg-opacity-10 backdrop-blur-sm border dark:border-white/20 dark:text-white text-black w-[50vw] max-sm:w-full py-3 rounded-xl shadow dark:shadow-none max-sm:hidden">
                <div className="button-group flex gap-6 justify-center text-lg max-sm:text-sm max-sm:gap-3 transition-all relative">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${editor.isActive('bold') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <GrBold />
                    </button>

                    <button onClick={() => setIsDropDown(!isDropDown)}>
                        <BiImage />
                    </button>

                    <div className={`absolute space-y-2 w-[40rem] bottom-20 ${isDropDown ? 'block' : 'hidden'}`}>
                        <Input type='text' placeholder='Enter Image Url' className='w-full bg-white text-black' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        <Button className='w-full' onClick={handleImageUrl}>Add Image</Button>
                    </div>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${editor.isActive('italic') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <MdOutlineFormatItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${editor.isActive('strike') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuStrikethrough />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={`${editor.isActive('code') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaCode />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`${editor.isActive('paragraph') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <RiText />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading1 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading3 />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${editor.isActive('bulletList') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaListUl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${editor.isActive('orderedList') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaListOl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`${editor.isActive('codeBlock') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <BiCodeBlock />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${editor.isActive('blockquote') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <GrBlockQuote />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <MdOutlineHorizontalRule />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <GrUndo />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <GrRedo />
                    </button>
                </div>
            </div>

            <div className="fixed bottom-10 right-10 hidden max-sm:block z-30" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                <FaPencil />
            </div>

            <div className={`control-group transition-all duration-300 mt-10 fixed bottom-20 right-6 z-20 bg-black bg-opacity-10 backdrop-blur-sm border dark:border-white/20 dark:text-white text-black h-fit py-3 px-4 rounded-xl shadow dark:shadow-none ${isMenuVisible ? 'block' : 'hidden'}`}>
                <div className="button-group flex flex-col gap-4 justify-center text-lg max-sm:text-sm relative">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${editor.isActive('bold') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <GrBold />
                    </button>

                    <button onClick={() => setIsDropDown(!isDropDown)}>
                        <BiImage />
                    </button>

                    <div className={`absolute space-y-2 w-[90vw] bottom-10 left-[-83vw] ${isDropDown ? 'block' : 'hidden'}`}>
                        <Input type='text' placeholder='Enter Image Url' className='w-full bg-white text-black' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        <Button className='w-full' onClick={handleImageUrl}>Add Image</Button>
                    </div>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${editor.isActive('italic') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <MdOutlineFormatItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${editor.isActive('strike') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuStrikethrough />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={`${editor.isActive('code') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaCode />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`${editor.isActive('paragraph') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <RiText />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading1 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <LuHeading3 />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${editor.isActive('bulletList') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaListUl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${editor.isActive('orderedList') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <FaListOl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`${editor.isActive('codeBlock') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <BiCodeBlock />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${editor.isActive('blockquote') ? 'is-active' : ''} hover:scale-110 duration-200`}
                    >
                        <GrBlockQuote />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <MdOutlineHorizontalRule />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <GrUndo />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        className='hover:scale-110 duration-200'
                    >
                        <GrRedo />
                    </button>
                </div>
            </div>

        </>
    )
}

type BlogEditorProps = {
    setContent: (content: string) => void;
    initialContent?: string;
};

export default function BlogEditor({ setContent, initialContent }: BlogEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image
        ],
        content: initialContent || "Start writing here...",
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
        },
        editorProps: {
            attributes: {
                spellcheck: 'true',
                class: 'border-none outline-none'
            },
        },
        immediatelyRender: false,
    })

    return (
        <>
            <MenuBar editor={editor} />
            <div className="editor-container w-[70vw] max-sm:w-full max-sm:px-3 px-3">
                <EditorContent editor={editor} className='py-3 mt-5' />
            </div>
        </>
    )
}