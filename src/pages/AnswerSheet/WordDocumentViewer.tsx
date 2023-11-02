import React from 'react';

interface WordDocumentViewerProps {
  docxFileUrl: string;
}

const WordDocumentViewer: React.FC<WordDocumentViewerProps> = ({
  docxFileUrl,
}) => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <iframe
        title="Word Viewer"
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${docxFileUrl}`}
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default WordDocumentViewer;
