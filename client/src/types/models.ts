export interface SearchPanelProps {
  onSelectSchool?: (school: string) => void;
}

export interface LayerToggleProps {
  layers?: string[];
}


type School = {
  id: number;
  name: string;
  address : string;
  student_count:number;
  teacher_count:number
  position : [number, number];
  school_type: string;
  phone:string;
  website:string;
};


export interface SchoolDetailPanelProps {
  school_s?: School | null;
  onClose: () => void;
}

