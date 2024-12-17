'use client'

import { IconType } from "react-icons";

interface categoryInputProps{
    selected?: boolean;
    label: string;
    icon: IconType;
    onClick: (value: string) => void
}

const categoryInput:React.FC<categoryInputProps> = ({selected, label, icon: Icon, onClick}) => {
    return ( 
    <div onClick = {() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 trasition cursor-pointer
    ${selected ? 'border-slate-500' : 'border-slate-200'}`}>
        <Icon size={30}/>
        <div className="font-medium">{label}</div>
    </div> );
}
 
export default categoryInput;