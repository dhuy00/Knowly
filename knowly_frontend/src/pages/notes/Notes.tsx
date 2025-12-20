import { React, useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import Dialog from "../../components/common/Dialog";
import Searchbar from "../../components/common/Searchbar";
import { IoMdSettings } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import { RiExpandDiagonal2Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import eventBus from "../../utils/eventBus";
import { EVENT_OPEN_TASK_DETAIL } from "../../constant/event";
import NotePreview from "../../components/notes/NotePreview.jsx"
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      name: "All project",
    },
    {
      name: "Overdue",
    },
    {
      name: "Done",
    },
    {
      name: "IN progress",
    },
  ]);

  const openNoteDetail = (id) => {
    navigate('1')
  }

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = eventBus.on(EVENT_OPEN_TASK_DETAIL, (isOpen) => {
      setOpen(isOpen)
    })

    return () => unsubscribe();
  }, [])

  return (
    <div className="bg-background-primary w-full h-full rounded-xl p-5 shadow-sm overflow-hidden">
      <div className="flex gap-4">
        <h3 className="font-bold text-text-primary text-2xl">
          Total 
          <span className="text-text-primary-active"> 7 notes </span>
          in your workspace
        </h3>
        <button
          className="flex justify-center items-center gap-1 text-common font-medium 
      bg-button-primary text-white px-4 py-1.5 rounded-md hover:bg-button-primary-hover 
      active:bg-button-primary-active cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CgAddR />
          <span>Add new</span>
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <SelectField
          options={projects}
          placeholder="Choose a project"
          className="margin-0 w-54"
        />
        <Searchbar value={searchKeyword} className="w-[800px]" />
        <div className="flex gap-3 text-xl justify-center items-center text-text-secondary ">
          <span className="p-1 rounded-md hover:bg-background-hover-secondary">
            <IoMdSettings />
          </span>
          <span className="p-1 rounded-md hover:bg-background-hover-secondary">
            <MdFilterAlt />
          </span>
          <span className="p-1 rounded-md hover:bg-background-hover-secondary">
            <RiExpandDiagonal2Line />
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 overflow-auto max-h-[580px] py-4 px-1">
        <NotePreview openNoteDetail={openNoteDetail}/>
        <NotePreview openNoteDetail={openNoteDetail}/>
        <NotePreview openNoteDetail={openNoteDetail}/>
        <NotePreview openNoteDetail={openNoteDetail}/>
        <NotePreview openNoteDetail={openNoteDetail}/>
        <NotePreview openNoteDetail={openNoteDetail}/>
      </div>
    </div>
  );
};

export default Notes;
