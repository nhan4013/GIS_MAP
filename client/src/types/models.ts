export interface SearchPanelProps {
  onSelectSchool?: (school: string) => void;
}

export interface LayerToggleProps {
  layers?: string[];
}


export interface SchoolDetailPanelProps {
  school_s?: null | unknown;
  onClose: () => void;
}

