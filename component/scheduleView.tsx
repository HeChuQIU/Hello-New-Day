import Course, {isOverlap, mergeSession} from "@/data/course";

const ScheduleView = ({courses, week}: { courses: Course[], week: number }) => {
    const ScheduleItems = mapCoursesToScheduleItems(courses.filter(c => c.courseWeeks.some(w => w === week)));
    return (
        <div className={"w-96 h-dvh grid grid-cols-7 grid-rows-12 gap-4"}>
            {
                ScheduleItems.map((si, i) => {
                    const dayInWeek = si.courses[0].dayInWeek;
                    const from = si.sectionsFromTo[0];
                    const to = si.sectionsFromTo[1];
                    return <div key={i}
                                className={`card grid col-start-${dayInWeek} col-span-1 row-start-${from} row-span-${to - from + 1}`}>
                    </div>;
                })
            }
        </div>
    )
}

type ScheduleItem = { courses: Course[], sectionsFromTo: [number, number] }

const mapCoursesToScheduleItems = (courses: Course[]): ScheduleItem[] => {
    const scheduleItems = courses.reduce((items, course) => {
        const overlapped = items.filter(i => i.courses.some(c => isOverlap(c, course)));
        if (overlapped.length === 0) {
            items.push({courses: [course], sectionsFromTo: course.sectionsFromTo as [number, number]});
        } else {
            overlapped.forEach(o => o.courses.push(course));
        }
        return items;
    }, [] as ScheduleItem[]);
    scheduleItems.filter(si => si.courses.length > 1).forEach(si => si.sectionsFromTo = mergeSession(...si.courses.map(c => c.sectionsFromTo as [number, number])));
    return scheduleItems;
};
export default ScheduleView;