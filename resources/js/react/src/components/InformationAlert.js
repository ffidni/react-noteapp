import React, {useEffect} from 'react'

export default function InformationAlert({type, text, clearAlert, delay}) {


    if (delay) {
        useEffect(() => {
            var count = 0;
            const interval = setInterval(() => {
                if (count === 1) {
                    clearAlert();
                    clearInterval(interval);
                } else {
                    count++;
                }
            }, 1000);
        }, []);
    }

  return (
    <div className={`notification ${type}`} onClick={clearAlert}>
        {
         type === "failed" ? <p className="icon">&times;</p> :
         <p className="icon">&#10003;</p>
        }
        <p className="text">{text}</p>
    </div>
  )
}
