export default class Course {
    courseName: string;
    courseId: string;
    teachingClassNames: readonly string[];
    courseCode: string;
    sectionsFromTo: readonly [number, number]
    courseWeeks: readonly number[];
    dayInWeek: Weekday;
    place: string;
    teachers: readonly string[];

    constructor(courseName: string, courseId: string, teachingClassNames: string[], courseCode: string, sections: number[], courseWeeks: number[], dayInWeek: Weekday, place: string, teachers: string[]) {
        if (sections.length === 0) throw new Error("Sections is empty!");
        const sortedSections = sections.sort();
        if (sections.length !== 2 && sortedSections.map((v, i) => [v, i]).some(vi => vi[0] !== sortedSections[0] + vi[1])) throw new Error("Sections is not continuous!");
        this.sectionsFromTo = [sortedSections[0], sortedSections[sortedSections.length - 1]]
        this.courseWeeks = courseWeeks.sort();

        this.courseName = courseName;
        this.courseId = courseId;
        this.teachingClassNames = teachingClassNames;
        this.courseCode = courseCode;
        this.dayInWeek = dayInWeek;
        this.place = place;
        this.teachers = teachers;
    }
}

export const isOverlap = (course0: Course, course1: Course): boolean => {
    if (course0.dayInWeek !== course1.dayInWeek) return false;
    if (course0.sectionsFromTo[0] > course1.sectionsFromTo[0]) [course0, course1] = [course1, course0];
    return course0.sectionsFromTo[1] > course1.sectionsFromTo[0];
}

export const mergeSession = (...sections: [number, number][]): [number, number] => {
    if (sections.length === 0) return [0, 0];
    if (sections.length === 1) return sections[0];
    const merged = [Math.min(...sections.map(s => s[0])), Math.max(...sections.map(s => s[1]))] as [number, number];
    return merged;
}

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";