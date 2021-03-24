import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { v1 } from "uuid";

import ProtvistaTrack from "protvista-track";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaTooltip from "protvista-tooltip";
import { ChangeEvent } from "./VariantCard";

interface ProtvistaManager extends Element {}

interface ProtvistaTrack extends Element {
  length: number;
  data: OrthologueMapping[];
}

export type OrthologuesAPI = {
  requestId: string;
  hasError: boolean;
  warnings: null;
  offset: null;
  maxReturn: null;
  total: null;
  results: OrthologueMapping[];
};

export type OrthologueMapping = {
  accession: string;
  uniProtId: string;
  sitePosition: number;
  positionInAlignment: number;
  featureTypes: string[];
  mappedSites: MappedSite[];
  unirefId: string;
};

type MappedSite = {
  accession: string;
  uniProtId: string;
  position: number;
  new: boolean;
};

export const loadWebComponent = (
  name: string,
  className: CustomElementConstructor
) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

loadWebComponent("protvista-manager", ProtvistaManager);
loadWebComponent("protvista-sequence", ProtvistaSequence);
loadWebComponent("protvista-navigation", ProtvistaNavigation);
loadWebComponent("protvista-track", ProtvistaTrack);
loadWebComponent("protvista-tooltip", ProtvistaTooltip);

const processOrthologuesData = (data: OrthologuesAPI) =>
  data.results.map((d) => ({
    ...d,
    start: d.sitePosition,
    end: d.sitePosition,
    color: "blue",
  }));

const OrthologuesCard: FunctionComponent<{
  data: OrthologuesAPI;
  sequence: string;
}> = ({ data, sequence }) => {
  const idRef = useRef(v1());
  const [ttContent, setTTContent] = useState(<></>);
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const processedData = useMemo(() => {
    if (data && data.results.length > 0) {
      return processOrthologuesData(data);
    }
  }, [data]);

  const handleChangeClick = (e: ChangeEvent) => {
    if (e.detail?.eventtype === "click") {
      setTTContent(
        <ul>
          {(e.detail.feature as OrthologueMapping).mappedSites?.map((site) => (
            <li key={site.accession}>
              {site.accession}: {site.position}
            </li>
          ))}
        </ul>
      );
      setX(e.detail.coords[0]);
      setY(e.detail.coords[1]);
      setVisible((visible) => !visible);
    }
  };

  const handleOutsideClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    const protvistaTrack = document.querySelector<ProtvistaTrack>(
      `[data-uuid='${idRef.current}_track']`
    );

    if (protvistaTrack && processedData) {
      protvistaTrack.data = processedData;
    }
  }, [processedData, sequence]);

  useEffect(() => {
    document.addEventListener("change", handleChangeClick);
    // Handle click outside
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("change", handleChangeClick);
    };
  }, []);

  if (!sequence || !processedData || processedData.length <= 0) {
    return null;
  }

  return (
    <div>
      <h5>Orthologues</h5>
      <protvista-manager
        attributes="displaystart displayend highlight selectedid"
        data-uuid={`${idRef.current}_manager`}
      >
        <protvista-navigation
          data-uuid={`${idRef.current}_nav`}
          length={sequence.length}
        />
        <protvista-sequence length={sequence.length} sequence={sequence} />
        <protvista-track
          data-uuid={`${idRef.current}_track`}
          length={sequence.length}
        />
      </protvista-manager>
      <protvista-tooltip
        x={x}
        y={y}
        visible={visible ? "" : undefined}
        title="Orthologue"
      >
        {ttContent}
      </protvista-tooltip>
    </div>
  );
};

export default OrthologuesCard;
