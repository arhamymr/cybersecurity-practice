# Penetration Testing Playbook - Template Framework

## Overview

This playbook provides a comprehensive template framework for penetration testing documentation. All templates follow a consistent structure designed for practical use during engagements while maintaining professional documentation standards.

## File Structure and Navigation

### Core Documentation Templates
1. [Engagement Summary](engagement-summary.md) - High-level engagement overview and objectives
2. [Progress Log](progress-log.md) - Daily progress tracking and phase completion
3. [Findings Log](findings.md) - Structured vulnerability and findings documentation
4. [Evidence Log](evidence.md) - Chain of custody and evidence collection tracking

### Phase-Specific Templates
5. [Reconnaissance Notes](recon-notes.md) - OSINT and intelligence gathering documentation
6. [Scan Results](scan-results.md) - Vulnerability assessment and scanning results
7. [Exploit Log](exploit-log.md) - Exploitation attempts and successful compromises
8. [Post-Exploitation Notes](post-exploitation-notes.md) - Post-compromise activities and analysis

### Supporting Templates
9. [Tools Used](tools-used.md) - Tool inventory and effectiveness tracking
10. [Contact List](contact-list.md) - Stakeholder and team contact management
11. [Timeline](timeline.md) - Project timeline and milestone tracking
12. [Summary Report](summary-report.md) - Final engagement report template

## How to Use This Framework

### Quick Start Guide

#### Before You Begin (30 Minutes)
1. **Copy Framework**: Copy entire template directory to new engagement folder
2. **Rename Folder**: Use engagement-specific name (e.g., "client-assessment-2025")
3. **Engagement Setup**: Complete metadata in engagement-summary.md
4. **Contact Setup**: Add all known contacts to contact-list.md
5. **Timeline Planning**: Establish key milestones in timeline.md
6. **Daily Preparation**: Open progress-log.md for day 1 activities

#### First Day Workflow
1. **Morning**: Update progress-log.md with daily plan
2. **Activities**: Begin testing activities, use relevant phase templates
3. **Findings**: Document any discoveries in findings.md immediately
4. **Evidence**: Add evidence to evidence.md with proper chain of custody
5. **Tools**: Update tools-used.md with deployed tools
6. **End of Day**: Complete progress-log.md with daily summary

### Engagement Type Workflows

#### Quick Assessment (1-2 Days)
**Essential Templates**: findings.md, evidence.md, progress-log.md, summary-report.md
**Optimal Workflow**:
```
Day 1: engagement-setup → testing → findings → evidence → progress-log
Day 2: complete-testing → summary-report → final-evidence
```

**Template Selection Matrix**:
| Day | Essential Templates | Optional Templates |
|-----|-------------------|-------------------|
| Day 1 | findings.md, evidence.md, progress-log.md | tools-used.md, contact-list.md |
| Day 2 | summary-report.md, findings.md | timeline.md |

#### Standard Engagement (1-2 Weeks)
**Essential Templates**: All core templates + phase-specific templates
**Weekly Workflow**:
```
Week 1: engagement-setup → recon → scanning → initial-findings
Week 2: exploitation → post-exploitation → reporting
```

**Template Priority by Week**:
| Week | High Priority | Medium Priority | Low Priority |
|------|---------------|-----------------|----------------|
| Week 1 | progress-log.md, recon-notes.md, scan-results.md | contact-list.md, timeline.md | tools-used.md |
| Week 2 | exploit-log.md, findings.md, summary-report.md | evidence.md, post-exploitation-notes.md | All templates |

#### Enterprise Assessment (1+ Month)
**Essential Templates**: All templates with comprehensive documentation
**Monthly Workflow**:
```
Month 1: comprehensive-recon → detailed-scanning → initial-exploitation
Month 2: advanced-exploitation → extensive-post-exploitation → detailed-reporting
```

**Template Usage Frequency**:
| Template | Usage Frequency | Update Frequency |
|----------|----------------|------------------|
| progress-log.md | Daily | Multiple times daily |
| findings.md | As needed | Immediately upon discovery |
| evidence.md | As needed | Immediately upon collection |
| timeline.md | Weekly | Weekly milestones |
| tools-used.md | As needed | When new tools deployed |

### Solo Penetration Testing Workflow

#### Phase-by-Phase Template Usage
1. **Pre-Engagement**: engagement-summary.md → contact-list.md → timeline.md
2. **Reconnaissance**: recon-notes.md → progress-log.md → findings.md (as needed)
3. **Scanning**: scan-results.md → tools-used.md → findings.md (as needed)
4. **Exploitation**: exploit-log.md → evidence.md → findings.md (as needed)
5. **Post-Exploitation**: post-exploitation-notes.md → findings.md → evidence.md
6. **Reporting**: summary-report.md → timeline.md (finalization)

#### Daily Solo Workflow
```
Morning: progress-log.md (plan) → phase-template (execution)
Afternoon: findings.md (discoveries) → evidence.md (collection)
Evening: progress-log.md (summary) → tools-used.md (if new)
```

### Team-Based Workflow

#### Role-Based Template Assignment
| Role | Primary Templates | Secondary Templates |
|------|------------------|-------------------|
| Team Lead | engagement-summary.md, timeline.md, summary-report.md | All templates (oversight) |
| Technical Lead | exploit-log.md, post-exploitation-notes.md, scan-results.md | findings.md, evidence.md |
| Analyst | recon-notes.md, scan-results.md, progress-log.md | findings.md, evidence.md |
| Documentation Specialist | All templates (consolidation), evidence.md | findings.md, tools-used.md |

#### Team Collaboration Process
1. **Daily Standup**: Review progress-log.md updates from all team members
2. **Findings Consolidation**: Merge findings.md entries, assign finding numbers
3. **Evidence Coordination**: Ensure evidence.md references align with findings.md
4. **Timeline Synchronization**: Update timeline.md with team milestones
5. **Cross-Reference Maintenance**: Ensure all template links remain accurate

### Template Selection Guide

#### Engagement Complexity Matrix
| Complexity | Duration | Team Size | Essential Templates | Recommended Approach |
|-------------|-----------|------------|-------------------|---------------------|
| Simple | 1-2 days | 1 person | findings.md, evidence.md, progress-log.md | Streamlined documentation |
| Moderate | 1 week | 1-2 people | All core templates | Balanced approach |
| Complex | 2-4 weeks | 2-3 people | All templates | Comprehensive documentation |
| Enterprise | 1+ month | 3+ people | All templates + custom sections | Full framework + custom |

#### Compliance-Focused Assessment Templates
| Compliance Requirement | Additional Sections | Specialized Templates |
|----------------------|---------------------|---------------------|
| PCI DSS | Compliance status, scope validation | Custom PCI-DSS section in findings.md |
| HIPAA | PHI handling, business associate analysis | Healthcare-specific sections in relevant templates |
| GDPR | Data processing inventory, breach notification | Custom GDPR documentation template |

### Practical Examples

#### Example: Critical Finding Documentation Workflow

**Step 1: Discovery in findings.md**
```markdown
### Finding #1: Remote Code Execution
- **Vulnerability:** Apache Struts RCE (CVE-2017-5638)
- **System:** web.example.com (10.1.1.100)
- **CVSS Score:** 10.0 (Critical)
- **Business Impact:** Complete system compromise, data exfiltration risk
- **Evidence:** [See Evidence ID #001]
- **Status:** Open
- **Priority:** P0 - Immediate
```

**Step 2: Evidence Collection in evidence.md**
```markdown
### Evidence #001
- **Type:** Screenshot
- **Description:** Successful RCE with whoami command execution
- **Date Collected:** 2025-02-01 14:30:00
- **Collection Method:** Manual screenshot during testing
- **Location:** evidence/rce_whoami_001.png
- **Related Finding:** Finding #1
- **Hash:** a1b2c3d4e5f6...
- **Integrity Status:** Verified
```

**Step 3: Progress Update in progress-log.md**
```markdown
### 2025-02-01 - Day 1
- **Phase:** Exploitation
- **Activities:** Web application testing, vulnerability exploitation
- **Findings Discovered:** 1 Critical (RCE)
- **Evidence Collected:** 1 screenshot
- **Tools Used:** Burp Suite, curl, manual testing
- **Issues/Challenges:** None
- **Next Steps:** Document exploit method, continue post-exploitation
```

**Step 4: Update Cross-References**
- Update exploit-log.md with exploit details
- Update summary-report.md executive summary
- Update timeline.md with critical milestone
- Ensure all "Related Documents" sections reference each other

#### Example: Daily Workflow Template Rotation

**Morning Routine (15 minutes)**
1. Open progress-log.md → Update daily plan
2. Review findings.md → Check for overnight changes
3. Check evidence.md → Verify integrity of recent evidence
4. Review timeline.md → Confirm today's activities align with plan

**During Testing (Ongoing)**
1. Use phase-specific template (recon-notes.md, scan-results.md, etc.)
2. Add findings to findings.md immediately upon discovery
3. Collect evidence and add to evidence.md with proper chain of custody
4. Update tools-used.md when deploying new tools

**End of Day Routine (30 minutes)**
1. Complete progress-log.md with daily summary
2. Review all template cross-references
3. Verify metadata consistency across documents
4. Backup all template files

### Troubleshooting Guide

#### Common Template Issues

**Broken Cross-References**
- **Problem**: Links between templates don't work
- **Solution**: Check file names and paths, ensure relative paths are correct
- **Prevention**: Use template verification script daily

**Metadata Inconsistencies**
- **Problem**: Target information differs between templates
- **Solution**: Use engagement-summary.md as master reference, copy to other templates
- **Prevention**: Update all templates when target information changes

**Finding Number Conflicts**
- **Problem**: Duplicate finding numbers across templates
- **Solution**: Use centralized numbering system in findings.md
- **Prevention**: Assign finding numbers immediately upon discovery

**Evidence Chain Gaps**
- **Problem**: Missing chain of custody information
- **Solution**: Complete evidence.md template immediately upon collection
- **Prevention**: Create evidence collection checklist

#### Template Recovery Procedures

**If Template Becomes Corrupted**
1. **Immediate**: Stop using corrupted template
2. **Backup**: Copy last good version from backup
3. **Recovery**: Re-enter data from other template references
4. **Verification**: Ensure cross-references still work

**If Data is Lost**
1. **Assessment**: Determine extent of data loss
2. **Recovery**: Reconstruct from other templates and memory
3. **Documentation**: Document loss and recovery in progress-log.md
4. **Prevention**: Implement automated backup procedures

### Advanced Usage Techniques

#### Template Automation
- **Template Scripting**: Create scripts to auto-fill common metadata
- **Cross-Reference Validation**: Use scripts to verify all links work
- **Backup Automation**: Schedule daily automatic backups
- **Integrity Checking**: Hash templates to detect unauthorized changes

#### Customization Strategies
- **Industry-Specific Sections**: Add industry-specific sections to relevant templates
- **Client-Specific Requirements**: Modify templates for specific client needs
- **Compliance Enhancements**: Add compliance-specific sections and checklists
- **Tool Integration**: Add tool-specific documentation sections

## Template Usage Guidelines

### Standard Template Structure
All templates follow this consistent format:

```markdown
# [Document Title]

## Metadata
- **Target:** [target information]
- **Date:** [YYYY-MM-DD]
- **Analyst:** [your name]
- **Phase:** [current phase]

## Sections
[Template-specific sections with structured placeholders]
```

### Placeholder Convention
- Use `[placeholder]` format for information to be filled in
- `[YYYY-MM-DD]` for date placeholders
- `[number]` for numbered items
- `[options]` for multiple-choice selections

### Cross-Reference System
Each template includes a "Related Documents" section with links to relevant templates, creating a cohesive documentation ecosystem.

## Engagement Workflow

### 1. Pre-Engagement Setup
- Create all template files for the engagement
- Complete [Engagement Summary](engagement-summary.md) with client information
- Set up [Contact List](contact-list.md) with all stakeholders
- Establish [Timeline](timeline.md) with key milestones

### 2. Active Engagement Phases

#### Phase 1: Reconnaissance
- Use [Reconnaissance Notes](recon-notes.md) to document intelligence gathering
- Update [Progress Log](progress-log.md) daily
- Log any immediate findings in [Findings Log](findings.md)
- Document evidence in [Evidence Log](evidence.md)

#### Phase 2: Scanning & Enumeration
- Use [Scan Results](scan-results.md) to document vulnerability assessments
- Update [Tools Used](tools-used.md) with new tools deployed
- Continue daily [Progress Log](progress-log.md) updates
- Add new findings to [Findings Log](findings.md)

#### Phase 3: Exploitation
- Use [Exploit Log](exploit-log.md) to document all exploitation attempts
- Track successful compromises and access gained
- Update [Timeline](timeline.md) with critical milestones
- Document all evidence in [Evidence Log](evidence.md)

#### Phase 4: Post-Exploitation
- Use [Post-Exploitation Notes](post-exploitation-notes.md) to document activities
- Track credential harvesting, lateral movement, and persistence
- Update [Findings Log](findings.md) with new discoveries
- Continue [Progress Log](progress-log.md) documentation

### 3. Reporting and Close-out
- Complete [Summary Report](summary-report.md) with all findings
- Finalize [Timeline](timeline.md) with actual completion dates
- Update [Tools Used](tools-used.md) with final tool effectiveness assessment
- Complete all cross-references between documents

## Quality Assurance Checklist

### Documentation Completeness
- [ ] All template metadata sections completed
- [ ] Cross-references between documents accurate
- [ ] Date formats consistent (YYYY-MM-DD)
- [ ] Numbering schemes consistent across documents
- [ ] Evidence properly logged with chain of custody

### Template Adherence
- [ ] Standard structure maintained
- [ ] Placeholder format consistent
- [ ] Sections completed appropriately
- [ ] Navigation elements functional
- [ ] Related documents sections accurate

### Cross-Document Consistency
- [ ] Target information consistent across all documents
- [ ] Timeline dates consistent between documents
- [ ] Contact information matches across templates
- [ ] Finding numbers align between documents
- [ ] Tool references match across documentation

## Template Customization

### Adding Custom Sections
Each template can be extended with additional sections while maintaining the standard structure:

```markdown
## Custom Section Title
[Custom content placeholders]
```

### Modifying Placeholders
Placeholders can be refined to match specific engagement requirements:
- `[target information]` → `[client organization]`
- `[analyst]` → `[lead analyst name]`
- `[phase]` → `[specific phase name]`

### Template Integration
Templates can be combined for specific use cases:
- Large engagements: Use all templates
- Focused assessments: Use subset of relevant templates
- Quick assessments: Use core templates only

## Document Management

### File Naming Convention
- Use provided template names consistently
- For multiple engagements: `[client_name]-[template_name].md`
- Maintain original template structure for consistency

### Version Control
- Keep original templates unchanged
- Create engagement-specific copies
- Document any customizations made
- Maintain change logs for custom templates

### Backup and Retention
- Regular backups of all documentation
- Retain templates according to client requirements
- Follow data retention policies
- Secure storage of sensitive information

## Training and Onboarding

### New Analyst Orientation
1. Review all template structures
2. Practice with sample data
3. Understand cross-reference system
4. Learn placeholder conventions
5. Review quality assurance requirements

### Template Refresh Schedule
- Quarterly review of template effectiveness
- Annual template updates based on feedback
- Integration of new tools and methodologies
- Alignment with industry standards

## Support and Resources

### Template Maintenance
- Update templates based on new requirements
- Incorporate feedback from engagements
- Maintain compliance with standards
- Adapt to new tool capabilities

### Documentation Standards
- Follow industry best practices
- Maintain professional documentation quality
- Ensure legal compliance requirements
- Support audit and review processes

---

## Template Integration Examples

### Complete Engagement Example (5-Day Assessment)

#### Day 1: Setup and Reconnaissance
```
08:00 - Copy template framework to engagement folder
08:15 - Complete engagement-summary.md with client information
08:30 - Set up contact-list.md with known stakeholders
08:45 - Establish timeline.md with 5-day schedule
09:00 - Begin reconnaissance, update recon-notes.md
10:30 - Discover subdomain, add to recon-notes.md
11:00 - Update progress-log.md with morning activities
12:00 - Lunch break
13:00 - Continue reconnaissance, find email addresses
14:00 - Add findings to findings.md (medium priority)
14:15 - Collect evidence, add to evidence.md
15:00 - Update tools-used.md with reconnaissance tools
15:30 - Complete progress-log.md day 1 summary
16:00 - End of day, backup all files
```

#### Day 2: Scanning and Enumeration
```
08:00 - Review progress-log.md, update day 2 plan
08:15 - Begin scanning, use scan-results.md template
09:00 - Network scan reveals 15 hosts, document in scan-results.md
10:00 - Web application scan, add to scan-results.md
11:00 - Critical vulnerability discovered, add to findings.md
11:15 - Collect screenshot evidence, add to evidence.md
11:30 - Update progress-log.md with critical finding
12:00 - Lunch break
13:00 - Continue vulnerability scanning
14:30 - Database server identified, document in scan-results.md
15:00 - Update timeline.md with scanning phase completion
15:30 - Complete progress-log.md day 2 summary
16:00 - End of day, verify cross-references
```

#### Day 3: Exploitation
```
08:00 - Review findings.md, prioritize critical vulnerability
08:15 - Begin exploitation, use exploit-log.md template
09:00 - Web application RCE successful, document in exploit-log.md
09:30 - Access gained, add to exploit-log.md
09:45 - Collect evidence, add to evidence.md
10:00 - Update findings.md with successful exploitation
10:15 - Update progress-log.md with exploitation success
10:30 - Attempt privilege escalation on compromised system
11:00 - Privilege escalation successful, document in exploit-log.md
11:15 - Update findings.md with privilege escalation
11:30 - Collect additional evidence, add to evidence.md
12:00 - Lunch break
13:00 - Continue exploitation attempts
14:00 - Database server compromise, document in exploit-log.md
14:30 - Update findings.md with database access
15:00 - Update tools-used.md with exploitation tools
15:30 - Complete progress-log.md day 3 summary
16:00 - End of day, verify all documentation is consistent
```

#### Day 4: Post-Exploitation
```
08:00 - Review exploit-log.md, plan post-exploitation activities
08:15 - Begin post-exploitation, use post-exploitation-notes.md
09:00 - Harvest credentials from compromised systems
09:30 - Document credentials in post-exploitation-notes.md
10:00 - Perform lateral movement to internal network
10:30 - Document lateral movement in post-exploitation-notes.md
11:00 - Access file server, discover sensitive data
11:30 - Document data discovery in post-exploitation-notes.md
11:45 - Add new findings to findings.md (data access)
12:00 - Lunch break
13:00 - Continue post-exploitation activities
14:00 - Establish persistence mechanism
14:30 - Document persistence in post-exploitation-notes.md
15:00 - Update timeline.md with post-exploitation phase
15:30 - Complete progress-log.md day 4 summary
16:00 - End of day, prepare for reporting phase
```

#### Day 5: Reporting and Clean-up
```
08:00 - Review all templates, ensure completeness
08:30 - Begin summary-report.md with executive summary
09:30 - Add detailed findings to summary-report.md
10:30 - Add remediation recommendations to summary-report.md
11:00 - Update timeline.md with actual completion dates
11:30 - Complete tools-used.md with tool effectiveness
12:00 - Lunch break
13:00 - Review all cross-references between templates
14:00 - Final quality assurance check
15:00 - Complete summary-report.md
15:30 - Finalize progress-log.md with engagement summary
16:00 - Engage clean-up procedures, document clean-up activities
17:00 - Final backup of all documentation
```

### Real-World Scenario Examples

#### Scenario 1: Critical Infrastructure Discovery
**Situation**: During reconnaissance, discover SCADA system interface
**Template Workflow**:
1. **Immediate**: Add to recon-notes.md with high priority
2. **Evidence**: Add screenshot to evidence.md (Evidence ID #SCADA001)
3. **Findings**: Add to findings.md as Critical finding
4. **Timeline**: Update timeline.md with critical discovery
5. **Contact**: Note in contact-list.md to discuss with client immediately
6. **Progress**: Update progress-log.md with discovery and client notification

#### Scenario 2: Zero-Day Vulnerability Discovery
**Situation**: Discover previously unknown vulnerability in custom application
**Template Workflow**:
1. **Documentation**: Document in exploit-log.md with detailed technical description
2. **Evidence**: Capture full exploitation process in evidence.md
3. **Findings**: Add to findings.md as Critical finding with CVSS estimation
4. **Research**: Add research notes to post-exploitation-notes.md
5. **Timeline**: Update timeline.md with zero-day discovery milestone
6. **Tools**: Update tools-used.md with custom exploit development tools
7. **Reporting**: Emphasize in summary-report.md executive summary

#### Scenario 3: Large-Scale Data Breach Simulation
**Situation**: Simulate data exfiltration from compromised database
**Template Workflow**:
1. **Planning**: Document simulation approach in post-exploitation-notes.md
2. **Execution**: Log each step in exploit-log.md
3. **Data Access**: Document data discovery in post-exploitation-notes.md
4. **Impact Assessment**: Add business impact analysis to findings.md
5. **Evidence**: Add data access evidence to evidence.md
6. **Timeline**: Update timeline.md with simulation milestones
7. **Reporting**: Include full impact analysis in summary-report.md

## Quick Reference

### Essential Templates
- **Immediate Start:** Engagement Summary, Contact List, Timeline
- **Daily Updates:** Progress Log
- **Findings:** Findings Log, Evidence Log
- **Phase Work:** Recon, Scanning, Exploitation, Post-Exploitation templates
- **Final Report:** Summary Report

### Common Workflows
1. **New Engagement:** Copy all templates → Fill metadata → Start with Engagement Summary
2. **Daily Routine:** Update Progress Log → Add findings → Log evidence
3. **Phase Transition:** Complete current template → Start next phase template → Update Timeline
4. **Report Preparation:** Collate findings → Complete Summary Report → Finalize Timeline

### Template Selection by Experience Level

#### Beginner Penetration Testers
**Essential Templates**:
- progress-log.md (daily tracking)
- findings.md (structured documentation)
- evidence.md (evidence collection)
- summary-report.md (final reporting)

**Approach**: Focus on core documentation, add phase templates as comfort increases

#### Intermediate Penetration Testers
**Essential Templates**:
- All core templates
- recon-notes.md, scan-results.md (phase planning)
- exploit-log.md (technical documentation)

**Approach**: Use comprehensive framework, customize based on engagement needs

#### Advanced Penetration Testers
**Essential Templates**:
- All templates
- Custom sections for specialized testing
- Advanced cross-referencing and automation

**Approach**: Full framework utilization with extensive customization

### Troubleshooting
- **Broken Links:** Check file names and paths
- **Missing Data:** Review related templates for information
- **Inconsistencies:** Use metadata sections to verify information
- **Template Issues:** Refer to quality assurance checklist
- **Cross-Reference Failures:** Verify all "Related Documents" sections
- **Metadata Conflicts:** Use engagement-summary.md as master reference
- **Finding Number Conflicts**: Use centralized numbering in findings.md
- **Evidence Chain Gaps**: Complete evidence.md immediately upon collection

---

*This template framework provides a consistent, comprehensive approach to penetration testing documentation that scales from quick assessments to complex enterprise engagements while maintaining professional standards and legal compliance.*