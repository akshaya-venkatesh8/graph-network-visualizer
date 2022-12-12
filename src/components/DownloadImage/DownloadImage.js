import { Button } from '@mui/material';
import { toPng } from 'html-to-image';
import './DownloadImage.scss'
import React from 'react';
import { useTheme } from '@emotion/react';

function getImage(dataUrl) {
    const a = document.createElement('a');
  
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }

export default function DownloadImage(props) {
    const theme = useTheme();
    const commonButtonStyles = {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.dots,
      };
    const downloadImage = () => {
        toPng(document.querySelector('.react-flow'), {
            filter: (node) => {
              if (
                node?.classList?.contains('react-flow__minimap') ||
                node?.classList?.contains('react-flow__controls') || node?.classList?.contains('MuiBox-root')
              ) {
                return false;
              }
              return true;
            },
          }).then(getImage);
    }
    return <div className="download-image-container">
        <Button className="download-btn" style={commonButtonStyles} onClick={downloadImage}>
      Download Image
    </Button>
    </div>
}