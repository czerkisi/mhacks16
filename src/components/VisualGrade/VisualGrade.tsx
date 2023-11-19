import React, { FC } from 'react';
import './VisualGrade.css';
import {calculateGrade, curveGrade} from "../../store/slices/propertiesSlice";

interface GradeCircleProps {
    grade: number;
}

const calculateColor = (grade: number): string => {
    const red = Math.min(255, Math.max(0, 255 - (grade - 20) * 6.375));
    const green = Math.min(255, Math.max(0, (grade - 20) * 6.375));
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
};

const GradeCircle: FC<GradeCircleProps> = ({ grade }) => {
    const curvedGrade = curveGrade(grade)
    const color = calculateColor(grade);
    const letterGrade = calculateGrade(curvedGrade);

    return (
        <div className="grade-circle-container">
            <div
                className="grade-circle"
                style={{
                    background: `radial-gradient(circle, ${color} 50%, transparent 50%)`,
                }}
            />
            <div className="grade-circle-letter">{letterGrade}</div>
        </div>
    );
};

export default GradeCircle;
