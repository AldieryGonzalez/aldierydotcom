import { ReactElement } from "react";
import { AiFillHome, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import {
	BsPlayFill,
	BsReverseLayoutTextSidebarReverse,
	BsGearFill,
	BsFillPersonFill,
} from "react-icons/bs";

type IconProps = {
	icon: ReactElement;
	text: String;
	link: string;
};
type ControlProps = {
	size: string;
};

const SideBar = () => {
	const size = "30";
	return (
		<div className='fixed text-white shadow-lg top-0 left-0 pt-4 h-full w-16 flex flex-col bg-gray-800'>
			<SideBarIcon link='/' icon={<AiFillHome size={size} />} text='Home' />
			<SideBarIcon
				link='/projects'
				icon={<BsPlayFill size={size} />}
				text='Projects'
			/>
			<SideBarIcon
				link='/contact'
				icon={<AiOutlineMail size={size} />}
				text='Contact Me'
			/>
			<SideBarIcon
				link='/blog'
				icon={<BsReverseLayoutTextSidebarReverse size={size} />}
				text='Blog'
			/>
			<ControlPanel size={size} />
		</div>
	);
};

const SideBarIcon = (props: IconProps) => {
	return (
		<Link href={props.link} className='sidebar-icon group'>
			{props.icon}
			<span className='sidebar-tooltip group-hover:scale-100'>
				{props.text}
			</span>
		</Link>
	);
};

const ControlPanel = (props: ControlProps) => {
	return (
		<div className='absolute bottom-0 w-full h-fit py-2 rounded-t-xl bg-gray-700'>
			<SideBarIcon
				link='/profile'
				icon={<BsFillPersonFill size={props.size} />}
				text='Profile'
			/>
			<SideBarIcon
				link='/settings'
				icon={<BsGearFill size={props.size} />}
				text='Settings'
			/>
		</div>
	);
};

export default SideBar;
