'use strict';

import React from 'react';
import PlayCircleFilled from 'material-ui-icons/PlayCircleFilled';

import paper from 'paper';
import Animator from '../animation/animator';

import Helpers from '../helpers';

require('styles//PreviewContainer.scss');

const animationFooter = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAACBCAYAAAAcyMQSAAAACXBIWXMAAAsTAAALEwEAmpwYAAA4LmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE2LTA5LTIzVDE0OjI5OjA2LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTYtMDktMjNUMTQ6MzA6MjYtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA5LTIzVDE0OjMwOjI2LTA0OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmQ1MzVhZjQ1LTkyOGUtNDhlMS04MzM5LWIwYzA0OWE1MWMwZTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpkNTM1YWY0NS05MjhlLTQ4ZTEtODMzOS1iMGMwNDlhNTFjMGU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpkNTM1YWY0NS05MjhlLTQ4ZTEtODMzOS1iMGMwNDlhNTFjMGU8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDUzNWFmNDUtOTI4ZS00OGUxLTgzMzktYjBjMDQ5YTUxYzBlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA5LTIzVDE0OjI5OjA2LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42MDA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg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';

// color options for video
const colorOptions =  [
  {
    bgColor: '#e44226',
    hColor: '#432958',
    waveColors: [[245,245,41], [245,204,41], [219,188,64]]
  },
  {
    bgColor: '#79d1ad',
    hColor: '#293271',
    waveColors: [[245,245,41], [245,204,41], [219, 188, 64]]
  },
  {
    bgColor: '#03245b',
    hColor: '#26d874',
    waveColors: [[45, 185, 214], [51, 219, 254],[39, 164, 191]]
  },
  {
    bgColor: '#000000',
    hColor: '#51e2d7',
    waveColors: [[255,255,255], [250,250,250], [252,252,252]]
  }
];

/** This component handles all of the rendering for the `<canvas>` animations for the local, realtime preview of the final mp4 animation. */
class PreviewContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.colorIndex = 0; //  Math.floor(Math.random()*colorOptions.length);    // random color
  }

  componentDidMount() {
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    // Listen for orientation changes
    this.res = () => {
      this._resize();
    }
    // window.addEventListener('orientationchange', this.res, false);

    // this.anims = ['basic', 'bounce'];
    // this.animType = 'basic';

    this.cnv = this._canvas;
    this.ctx = this._canvas.getContext('2d');
    this.fps = 20;

    this._initPaperCanvas(this.colorIndex);
  }
  componentWillUnmount() {
    // window.removeEventListener('orientationchange', this.res);

    // destroy paper canvas
    this.paper.project.remove();
  }
  draw() {
    window.setTimeout( () => {
      if (this.props.playing) {
        this.tick(this.props.regionStart, this.props.regionEnd);
        window.requestAnimFrame(this.draw.bind(this));
      }
    }, 1000/this.fps);
  }
  _initPaperCanvas(colorIndex) {
    this.colorIndex = colorIndex || 0;
    this.props.onColorChange(colorOptions[this.colorIndex]);

    // set up paper
    paper.setup(this.cnv);
    this.paper = paper;

    if (this._canvasContainer.getBoundingClientRect().width === 0) return;

    this.animator = new Animator({
      paper: this.paper,
      width: this._canvasContainer.getBoundingClientRect().width,
      height: this._canvasContainer.getBoundingClientRect().height,
      fps: this.fps,
      showNumber: this.props.showNumber,
      // footerImgBase64: this.refs._footerImg.src,
      footerImgBase64: animationFooter,
      style: {
        textColor1 : 'white',
        textColor2 : colorOptions[colorIndex].hColor || '#432958',
        bgColor    : colorOptions[colorIndex].bgColor || '#e44226',
        waveColors: colorOptions[colorIndex].waveColors || [ [255,0,255], [245,204,41], [219,188,64] ]
      }
    });
    this.animator._resize();
    this._selectionChanged();
  }
  _resize() {
    this.paper.project.remove();

    window.setTimeout(() => {
      this._initPaperCanvas(this.colorIndex);
    }, 1);
  }
  _selectionChanged() {
    const peaksArray = Helpers.getPeaksInRange(this.props.peaks, this.props.regionStart, this.props.regionEnd, this.props.totalDuration);
    if (!this.animator) return;
    this.animator.setRegion(this.props.regionStart, this.props.regionEnd - this.props.regionStart, this.props.selectedWords, peaksArray);
  }
  _playingChanged() {
    if (!this.animator) return;
    // update text in animator
    this.animator.reset();

    // start loop, but set timeout to update text in animator first
    setTimeout(() => {
      if (this.props.playing) {
        this.draw();
      }
    }, 200); // give textSaid time to clear

  }
  animPrev() {
    var currentIndex = this.anims.indexOf(this.animType);
    // subtract one from the index, but wrap back around to the end of the array if below 1
    var nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = this.anims.length-1;
    }
    this.animType = this.anims[nextIndex];
    this.props.togglePlay(true);
  }

  animNext() {
    var currentIndex = this.anims.indexOf(this.animType);
    // add one to the index, but wrap back around to the start of the array if above 1
    var nextIndex = (currentIndex + 1) % this.anims.length
    this.animType = this.anims[nextIndex];
    this.props.togglePlay(true);
  }

  changeColorScheme(e) {
    const index = e.target.dataset.index;
    const easing = this.animator.introOffset;

    this.paper.project.remove();
    this._initPaperCanvas(index);

    window.ga('send', {
      'hitType': 'event',
      'eventCategory': 'Preview',
      'eventAction': 'ChangeColorScheme',
      'eventLabel': 'ChangeColorScheme',
      'eventValue': index
    });

    // reset easing to the previous amount
    this.animator.introOffset = easing;
  }

  render() {

    const colorSquares = colorOptions.map( (opt, i) => {
      return <div className="preview-option" key={`square-${i}`} data-index={i} onClick={this.changeColorScheme.bind(this)}style={{backgroundColor: colorOptions[i].bgColor}}></div>
    });

    return (
      <div className="previewcontainer-component">
        <img src={animationFooter} id="animation-footer" ref="_footerImg" />
        <div className="preview-canvas-container" ref={(c) => this._canvasContainer = c}>
          <PlayCircleFilled
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              fill: 'rgb(255,255,255)',
              opacity: this.props.playing ? '0' : '0.7',
              cursor: 'pointer',
              left: '0px',
              right: '0px',
              margin: 'auto',
              backgroundColor: 'rgba(50,50,50,0.5)'
            }}
            viewBox='-12 -12 48 48'
            onClick={() => this.togglePlay()}
          />
          <canvas ref={(c) => this._canvas = c} onClick={() => this.togglePlay()} id="canvas" width="200" height="200"/>
        </div>
        <div className="preview-option-container">
          {colorSquares}
        </div>

      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    // if the selected words are different (either a different length, or different start/end times), we should update the preview container. we cast the start times to numbers using `+` because sometimes they come in as strings, sometimes as numbers
    return (nextProps.playing !== this.props.playing || nextProps.selectedWords.length > 0 && (nextProps.selectedWords.length !== this.props.selectedWords.length || +nextProps.selectedWords[0].start !== +this.props.selectedWords[0].start || +nextProps.selectedWords[nextProps.selectedWords.length-1].start !== +this.props.selectedWords[this.props.selectedWords.length-1].start) );
  }

  componentDidUpdate(prevProps) {
    const selectionChanged = prevProps.regionStart && (prevProps.regionStart !== this.props.regionStart || prevProps.regionEnd !== this.props.regionEnd);
    const playingChanged = prevProps.playing !== this.props.playing;
    if (!playingChanged && !selectionChanged) return;

    this._selectionChanged();

    // autoplay on selection change ... ?
    if (playingChanged) {
      this._playingChanged();
    } else {
      window.setTimeout(() => {
        this.props.togglePlay(true);
      }, 1);
    }

  }

  tick() {
    if (this.props.playing && this.props.selectedWords.length > 0) {
      this.animator.step(this.props.pos * 1000);
    } else {
      return;
    }
  }

  togglePlay() {
    const _label = this.props.playing ? 'Pause' : 'Play';
    window.ga('send', {
      'hitType': 'event',
      'eventCategory': 'Preview',
      'eventAction': 'TogglePlay',
      'eventLabel': _label
    });
    this.props.togglePlay();
  }
}

PreviewContainerComponent.displayName = 'PreviewContainerComponent';

// Uncomment properties you need
PreviewContainerComponent.propTypes = {
  clipTooLong: React.PropTypes.bool
};
PreviewContainerComponent.defaultProps = {
  selectedWords: [],
  clipTooLong: false,
  muiTheme: {
    palette: {
    }
  }
};

export default PreviewContainerComponent;
