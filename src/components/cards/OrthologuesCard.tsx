import React, { FunctionComponent, useEffect, useRef, useMemo } from "react";
import { v1 } from "uuid";

import ProtvistaTrack from "protvista-track";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";

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

  const processedData = useMemo(() => {
    if (data && data.results.length > 0) {
      return processOrthologuesData(data);
    }
  }, [data]);

  // <ul>
  //   {(e.detail.feature as OrthologueMapping).mappedSites?.map((site) => (
  //     <li key={site.accession}>
  //       <a href={`//www.uniprot.org/uniprot/${site.accession}`}>
  //         {site.accession}
  //       </a>
  //       : {site.position}
  //     </li>
  //   ))}
  // </ul>

  useEffect(() => {
    const protvistaTrack = document.querySelector<ProtvistaTrack>(
      `[data-uuid='${idRef.current}_track']`
    );

    if (protvistaTrack && processedData) {
      protvistaTrack.data = processedData;
    }
  }, [processedData, sequence]);

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
        <protvista-datatable>
          <table>
            <thead>
              <tr>
                <th>Accession</th>
                <th>Protein ID</th>
                <th>Position</th>
                <th>Position in alignment</th>
              </tr>
            </thead>
            <tbody>
              {processedData.map((alignment) =>
                alignment.mappedSites.map((row) => (
                  <tr
                    key={row.accession}
                    data-start={alignment.sitePosition}
                    data-end={alignment.sitePosition}
                  >
                    <td>
                      <a
                        href={`//www.uniprot.org/uniprot/${row.accession}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.accession}
                      </a>
                    </td>
                    <td>{row.uniProtId}</td>
                    <td>{alignment.sitePosition}</td>
                    <td>{row.position}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </protvista-datatable>
      </protvista-manager>
    </div>
  );
};

export default OrthologuesCard;
