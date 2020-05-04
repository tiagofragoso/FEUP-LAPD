import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";

import { headerFontFamily } from "../AppTheme";

export const CustomTabs = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const StyledTabs = withStyles({
        indicator: {
            background: "linear-gradient(90deg, #FF7BAC 0%, #F7931E 100%)",
            height: "5px",
        },
    })((props) => <Tabs {...props} />);

    const StyledTab = withStyles((theme) => ({
        root: {
            textTransform: "uppercase",
            color: "rgba(68, 69, 69, 0.5)",
            fontFamily: headerFontFamily.join(","),
            fontWeight: theme.typography.fontWeightBold,
            fontSize: theme.typography.pxToRem(16),
            "&:hover, &$selected": {
                "& span": {
                    backgroundColor: "#FF7BAC",
                    backgroundImage: "linear-gradient(90deg, #FF7BAC 0%, #F7931E 100%)",
                    backgroundSize: "100%",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                },
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    const TabPanel = ({ index, children }) =>
        <div role="tabpanel" hidden={selectedTab !== index}>
            {selectedTab === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>;

    return (
        <>
            <StyledTabs centered value={selectedTab} onChange={handleChange}>
                {
                    tabs.map(({ label }, i) =>
                        <StyledTab valye={i} key={i} label={label} />
                    )
                }
            </StyledTabs>
            {
                tabs.map(({ items }, i) =>
                    <TabPanel key={i} index={i}>
                        {items}
                    </TabPanel>
                )
            }
        </>
    );

};

export default CustomTabs;

CustomTabs.propTypes = {
    tabs: PropTypes.array.isRequired,
};
