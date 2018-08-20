/**
 * 行为装饰器，使工具具有item选择的能力
 */
export default function hitBehavior() {
    return function (target) {

        target.prototype.onMouseMove = function(event){

        }
    }
}